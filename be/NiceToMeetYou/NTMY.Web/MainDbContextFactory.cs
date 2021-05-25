using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using NTMY.Infrastructure.Contexts;

namespace NTMY.Web
{
    public class MainDbContextFactory : IDesignTimeDbContextFactory<MainDbContext>, IDesignTimeDbContextFactory<EventDbContext>
    {
        private readonly IConfigurationRoot _configurationRoot;
        public MainDbContextFactory()
        {
            var configBuilder = new ConfigurationBuilder().AddJsonFile("appsettings.json");
            _configurationRoot = configBuilder.Build();
        }

        public MainDbContext CreateDbContext(string[] args)
        {

            var optionsBuilder = new DbContextOptionsBuilder<MainDbContext>();
            optionsBuilder.UseSqlServer(_configurationRoot["ConnectionStrings:MainConnectionString"]);

            return new MainDbContext(optionsBuilder.Options);
        }

        EventDbContext IDesignTimeDbContextFactory<EventDbContext>.CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<EventDbContext>();
            optionsBuilder.UseSqlServer(_configurationRoot["ConnectionStrings:EventConnectionString"]);

            return new EventDbContext(optionsBuilder.Options);
        }
    }
}
