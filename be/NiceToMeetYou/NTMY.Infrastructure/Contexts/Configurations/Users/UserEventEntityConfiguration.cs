using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NTMY.Infrastructure.Persistance.Users;

namespace NTMY.Infrastructure.Contexts.Configurations.Users
{
    public class UserEventEntityConfiguration : IEntityTypeConfiguration<UserEventEntity>
    {
        public void Configure(EntityTypeBuilder<UserEventEntity> builder)
        {
            builder.HasKey(x => x.Id);
        }
    }
}