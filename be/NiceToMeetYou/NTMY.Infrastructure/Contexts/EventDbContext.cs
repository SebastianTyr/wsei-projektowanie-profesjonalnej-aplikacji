using Microsoft.EntityFrameworkCore;
using NTMY.Infrastructure.Contexts.Configurations.Pairs;
using NTMY.Infrastructure.Contexts.Configurations.Users;
using NTMY.Infrastructure.Persistance.Pairs;
using NTMY.Infrastructure.Persistance.Users;

namespace NTMY.Infrastructure.Contexts
{
    public class EventDbContext : PlaygroundShared.Infrastructure.EF.EventDbContext.EventDbContext
    {
        public DbSet<UserEventEntity> Users { get; set; }
        public DbSet<PairEventEntity> Pairs { get; set; }

        protected EventDbContext()
        {
        }

        public EventDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserEventEntityConfiguration());
            modelBuilder.ApplyConfiguration(new PairEventEntityConfiguration());
        }
    }
}