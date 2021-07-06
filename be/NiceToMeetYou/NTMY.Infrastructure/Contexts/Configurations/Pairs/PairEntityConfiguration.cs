using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NTMY.Infrastructure.Persistance.Pairs;
using NTMY.Infrastructure.Persistance.Users;

namespace NTMY.Infrastructure.Contexts.Configurations.Pairs
{
    public class PairEntityConfiguration : IEntityTypeConfiguration<PairEntity>
    {
        public void Configure(EntityTypeBuilder<PairEntity> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedNever();
            builder.HasOne(x => x.FirstUser).WithMany().HasForeignKey(x => x.FirstUserId).OnDelete(DeleteBehavior.Restrict);
            builder.HasOne(x => x.SecondUser).WithMany().HasForeignKey(x => x.SecondUserId).OnDelete(DeleteBehavior.Restrict);
            builder.HasOne<UserEntity>().WithMany().HasForeignKey(x => x.CancelledBy).OnDelete(DeleteBehavior.Restrict);
            builder.HasOne<UserEntity>().WithMany().HasForeignKey(x => x.CompletedBy).OnDelete(DeleteBehavior.Restrict);
            builder.HasMany(x => x.Messages).WithOne().HasForeignKey(x => x.Id);
        }
    }
}
