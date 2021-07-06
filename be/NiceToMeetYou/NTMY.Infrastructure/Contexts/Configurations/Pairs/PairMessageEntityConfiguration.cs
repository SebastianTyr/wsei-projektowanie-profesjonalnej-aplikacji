using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NTMY.Infrastructure.Persistance.Pairs;
using NTMY.Infrastructure.Persistance.Users;

namespace NTMY.Infrastructure.Contexts.Configurations.Pairs
{
    public class PairMessageEntityConfiguration : IEntityTypeConfiguration<PairMessageEntity>
    {
        public void Configure(EntityTypeBuilder<PairMessageEntity> builder)
        {
            builder.HasKey(x => new { x.Id, x.No });
            builder.Property(x => x.Id).ValueGeneratedNever();
            builder.Property(x => x.No).ValueGeneratedNever();
            builder.HasOne<UserEntity>().WithMany().HasForeignKey(x => x.FromUserId).OnDelete(DeleteBehavior.Restrict);
            builder.HasOne<UserEntity>().WithMany().HasForeignKey(x => x.ToUserId).OnDelete(DeleteBehavior.Restrict);
            builder.HasOne<PairEntity>().WithMany(x => x.Messages).HasForeignKey(x => x.Id).OnDelete(DeleteBehavior.Cascade);
        }
    }
}