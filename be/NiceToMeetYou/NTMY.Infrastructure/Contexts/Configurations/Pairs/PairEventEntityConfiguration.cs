using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NTMY.Infrastructure.Persistance.Pairs;

namespace NTMY.Infrastructure.Contexts.Configurations.Pairs
{
    public class PairEventEntityConfiguration : IEntityTypeConfiguration<PairEventEntity>
    {
        public void Configure(EntityTypeBuilder<PairEventEntity> builder)
        {
            builder.HasKey(x => x.Id);
        }
    }
}