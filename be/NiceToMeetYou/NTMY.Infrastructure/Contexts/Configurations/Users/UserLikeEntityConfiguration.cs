using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NTMY.Infrastructure.Persistance.Users;

namespace NTMY.Infrastructure.Contexts.Configurations.Users
{
    public class UserLikeEntityConfiguration : IEntityTypeConfiguration<UserLikeEntity>
    {
        public void Configure(EntityTypeBuilder<UserLikeEntity> builder)
        {
            builder.HasKey(x => new {x.Id, x.No});
            builder.Property(x => x.Id).ValueGeneratedNever();
            builder.Property(x => x.No).ValueGeneratedNever();
            builder.HasOne<UserEntity>().WithMany(x => x.Likes).HasForeignKey(x => x.Id).OnDelete(DeleteBehavior.Restrict);
            builder.HasOne<UserEntity>().WithMany().HasForeignKey(x => x.LikedUserId).OnDelete(DeleteBehavior.Restrict);
        }
    }
}