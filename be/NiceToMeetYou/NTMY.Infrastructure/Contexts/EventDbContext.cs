using Microsoft.EntityFrameworkCore;
using NTMY.Infrastructure.Contexts.Configurations.Users;
using NTMY.Infrastructure.Persistance.Users;

namespace NTMY.Infrastructure.Contexts
{
    public class EventDbContext : PlaygroundShared.Infrastructure.EF.EventDbContext.EventDbContext
    {
        public DbSet<UserEventEntity> Users { get; set; }

        protected EventDbContext()
        {
        }

        public EventDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserEventEntityConfiguration());
        }
    }
}