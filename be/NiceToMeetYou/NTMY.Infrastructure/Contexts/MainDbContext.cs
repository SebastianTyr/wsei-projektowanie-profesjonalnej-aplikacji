using Microsoft.EntityFrameworkCore;
using NTMY.Infrastructure.Contexts.Configurations.Users;
using NTMY.Infrastructure.Persistance.Users;

namespace NTMY.Infrastructure.Contexts
{
    public class MainDbContext : DbContext
    {
        public DbSet<UserEntity> Users { get; set; }
        public DbSet<UserLikeEntity> UserLikes { get; set; }

        protected MainDbContext()
        {
        }

        public MainDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserEntityConfiguration());
            modelBuilder.ApplyConfiguration(new UserLikeEntityConfiguration());
        }
    }
}
