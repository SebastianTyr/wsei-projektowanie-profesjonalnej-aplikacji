using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NTMY.Application.Interfaces.Users.Commands;
using NTMY.Domain.Users;
using NTMY.SharedKernel;
using PlaygroundShared.Application.CQRS;

namespace NTMY.Web.Extensions
{
    public static class StartupApplicationBuilderExtensions
    {
        public static IApplicationBuilder SeedDatabase(this IApplicationBuilder app)
        {
            app.MigrateDatabases();
            app.SeedAdminUser();

            return app;
        }

        private static void MigrateDatabases(this IApplicationBuilder app)
        {
            var mainContext = app.ApplicationServices.GetService<DbContext>();
            var eventContext = app.ApplicationServices
                .GetService<PlaygroundShared.Infrastructure.EF.EventDbContext.EventDbContext>();

            mainContext.Database.Migrate();
            eventContext.Database.Migrate();
        }

        private static void SeedAdminUser(this IApplicationBuilder app)
        {
            var createUserCommand = new RegisterUserCommand(
                "admin",
                "admin",
                "admin",
                "admin@admin.com",
                Gender.Other,
                DateTime.Now,
                "zaq1@WSX",
                "zaq1@WSX");
            var activateUserCommand = new ActivateUserCommand(createUserCommand.Id);

            try
            {
                var commandDispatcher = app.ApplicationServices.GetService<ICommandDispatcher>();
                commandDispatcher.DispatchAsync(createUserCommand).GetAwaiter().GetResult();
                commandDispatcher.DispatchAsync(activateUserCommand).GetAwaiter().GetResult();
            }
            catch (Exception ex)
            {
                if (!(ex is BusinessLogicException))
                {
                    throw;
                }
            }
        }
    }
}

    
