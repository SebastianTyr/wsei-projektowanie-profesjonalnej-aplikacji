using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System.Text;
using Autofac;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using NTMY.Application;
using NTMY.Application.Notifications.Hubs;
using NTMY.Application.Users;
using NTMY.Application.Users.Handlers;
using NTMY.Domain;
using NTMY.Domain.Users;
using NTMY.Domain.Users.Factories;
using NTMY.Domain.Users.Repositories;
using NTMY.Infrastructure;
using NTMY.Infrastructure.Contexts;
using NTMY.Infrastructure.Persistance.Users;
using NTMY.Web.Extensions;
using NTMY.Web.MappingProfiles;
using PlaygroundShared.Application.CQRS;
using PlaygroundShared.Application.Services;
using PlaygroundShared.Configurations;
using PlaygroundShared.Domain;
using PlaygroundShared.DomainEvents;
using PlaygroundShared.Infrastructure;
using PlaygroundShared.Infrastructure.Repositories;
using PlaygroundShared.IoC;
using PlaygroundShared.Messages;
using PlaygroundShared.Middlewares;

namespace NTMY.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddSignalR();

            services.AddAuthentication(options => {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(jwt => {
                    var key = Encoding.ASCII.GetBytes(Configuration["JwtConfiguration:Secret"]);

                    jwt.SaveToken = true;
                    jwt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true, // this will validate the 3rd part of the jwt token using the secret that we added in the appsettings and verify we have generated the jwt token
                        IssuerSigningKey = new SymmetricSecurityKey(key), // Add the secret key to our Jwt encryption
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        RequireExpirationTime = false,
                        ValidateLifetime = true
                    };
                });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "NTMY.Web", Version = "v1" });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please insert JWT with Bearer into field",
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new string[] { }
                    }
                });
            });
        }
        public void ConfigureContainer(ContainerBuilder builder)
        {
            // Register your own things directly with Autofac here. Don't
            // call builder.Populate(), that happens in AutofacServiceProviderFactory
            // for you.
            var sqlConnectionConfiguration = new SqlConnectionConfiguration();
            Configuration.Bind("ConnectionStrings", sqlConnectionConfiguration);
            builder.Register(ctx => sqlConnectionConfiguration).As<ISqlConnectionConfiguration>();

            var jwtConfig = new JwtConfiguration();
            Configuration.Bind("JwtConfiguration", jwtConfig);
            builder.Register(ctx => jwtConfig).As<IJwtConfiguration>();

            builder.RegisterType<DomainEventsManager>().As<IDomainEventsManager>().InstancePerLifetimeScope();
            builder.RegisterAssemblyTypes(typeof(IUserFactory).Assembly).Where(x => x.IsAssignableTo(typeof(IAggregateRecreate<>))).AsImplementedInterfaces();
            builder.RegisterMainEfDbContext<MainDbContext>(sqlConnectionConfiguration);
            builder.RegisterEventEfDbContext<EventDbContext>(sqlConnectionConfiguration);

            builder.RegisterAssemblyTypes(typeof(IUserFactory).Assembly).Where(x => x.Name.EndsWith("DomainEventFactory") && x.IsClass).AsImplementedInterfaces();
            builder.RegisterAssemblyTypes(typeof(IUserFactory).Assembly).Where(x => x.Name.EndsWith("PolicyFactory") && x.IsClass).AsImplementedInterfaces();
            builder.RegisterAssemblyTypes(typeof(User).Assembly).Where(x => x.IsAssignableTo<IDomainFactory>())
                .AsImplementedInterfaces().InstancePerLifetimeScope();

            builder.RegisterAssemblyTypes(typeof(UserEfRepository).Assembly).AsClosedTypesOf(typeof(IGenericRepository<>));
            builder.RegisterAssemblyTypes(typeof(UserEfRepository).Assembly).AsClosedTypesOf(typeof(IGenericEventRepository<>));
            builder.RegisterAssemblyTypes(typeof(UserRepository).Assembly).Where(x => x.IsAssignableTo<IRepository>()).AsImplementedInterfaces();

            builder.RegisterAssemblyTypes(typeof(UserService).Assembly).Where(x => x.IsAssignableTo<IService>()).AsImplementedInterfaces();
            builder.RegisterAssemblyTypes(typeof(RegisterUserCommandHandler).Assembly)
                .AsClosedTypesOf(typeof(ICommandHandler<>));
            builder.RegisterAssemblyTypes(typeof(LoginUserQueryHandler).Assembly)
                .AsClosedTypesOf(typeof(IQueryHandler<,>));
            builder.RegisterType<CommandDispatcher>().As<ICommandDispatcher>();
            builder.RegisterType<QueryDispatcher>().As<IQueryDispatcher>();
            builder.RegisterType<CommandQueryDispatcherDecorator>().As<ICommandQueryDispatcherDecorator>();

            builder.Register(ctx =>
            {
                var assemblies = new List<Assembly>()
                {
                    typeof(UserMappingProfile).Assembly,
                    typeof(UserControllerMappingProfile).Assembly
                };

                var profiles = assemblies.SelectMany(x => x.GetExportedTypes()).Where(x => x.IsAssignableTo<Profile>())
                    .Select(x => (Profile) Activator.CreateInstance(x));

                var cfg = new MapperConfiguration(m =>
                {
                    m.DisableConstructorMapping();
                    m.AddProfiles(profiles);
                });

                return new Mapper(cfg);
            }).As<IMapper>().InstancePerLifetimeScope();

            //builder.RegisterRabbitMq("rawrabbit.json");
            builder.RegisterType<EventsService>().As<IEventsService>();
            builder.RegisterType<FakeMessagePublisher>().As<IMessagePublisher>().InstancePerLifetimeScope();
            builder.Register(ctx => new CorrelationContext()).As<ICorrelationContext>().InstancePerLifetimeScope();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "NTMY.Web v1"));
            }

            app.UseHttpsRedirection();

            app.UseCors(ctx =>
            {
                ctx.WithOrigins(Configuration["FrontendUrl"]);
                ctx.AllowCredentials();
                ctx.AllowAnyHeader();
                ctx.AllowAnyMethod();
            });

            app.UseRouting();

            app.UseAuthorization();
            app.UseAuthentication();

            app.UseEventsPublisherMiddleware();
            app.UseCorrelationContextMiddleware();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<PairMessagesHub>("/pairMessages");
            });

            app.SeedDatabase();
        }
    }
}
