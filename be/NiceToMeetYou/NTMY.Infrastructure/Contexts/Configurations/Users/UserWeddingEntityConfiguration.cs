using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NTMY.Infrastructure.Persistance.Users;

namespace NTMY.Infrastructure.Contexts.Configurations.Users
{
    public class UserWeddingEntityConfiguration : IEntityTypeConfiguration<UserWeddingEntity>
    {
        public void Configure(EntityTypeBuilder<UserWeddingEntity> builder)
        {
            builder.HasKey(x => new {x.Id, x.No});  
            builder.Property(x => x.Id).ValueGeneratedNever();
            builder.Property(x => x.No).ValueGeneratedNever();
            builder.HasOne<UserEntity>().WithMany(x => x.Weddings).HasForeignKey(x => x.Id).OnDelete(DeleteBehavior.Restrict);
        }
    }
}