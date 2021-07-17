using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NTMY.Infrastructure.Persistance.Users;

namespace NTMY.Infrastructure.Contexts.Configurations.Users
{
    public class UserPhotoEntityConfiguration : IEntityTypeConfiguration<UserPhotoEntity>
    {
        public void Configure(EntityTypeBuilder<UserPhotoEntity> builder)
        {
            builder.HasKey(x => new {x.Id, x.No});
            builder.Property(x => x.Id).ValueGeneratedNever();
            builder.Property(x => x.No).ValueGeneratedNever();
            builder.Property(x => x.Name).HasMaxLength(255);
            builder.Property(x => x.Path).HasMaxLength(511);
            builder.HasOne<UserEntity>().WithMany(x => x.Photos).HasForeignKey(x => x.Id).OnDelete(DeleteBehavior.Restrict);
        }
    }
}