using Microsoft.EntityFrameworkCore;
using NTMY.Infrastructure.Contexts.Configurations.Pairs;
using NTMY.Infrastructure.Contexts.Configurations.Users;
using NTMY.Infrastructure.Persistance.Pairs;
using NTMY.Infrastructure.Persistance.Users;

namespace NTMY.Infrastructure.Contexts
{
    public class MainDbContext : DbContext
    {
        public DbSet<UserEntity> Users { get; set; }
        public DbSet<UserLikeEntity> UserLikes { get; set; }
        public DbSet<UserWeddingEntity> UserWeddings { get; set; }
        public DbSet<UserPhotoEntity> UserPhotos { get; set; }
        public DbSet<PairEntity> Pairs { get; set; }
        public DbSet<PairMessageEntity> PairMessages { get; set; }

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
            modelBuilder.ApplyConfiguration(new UserPhotoEntityConfiguration());
            modelBuilder.ApplyConfiguration(new UserWeddingEntityConfiguration());
            modelBuilder.ApplyConfiguration(new PairEntityConfiguration());
            modelBuilder.ApplyConfiguration(new PairMessageEntityConfiguration());
        }
    }
}
