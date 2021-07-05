using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NTMY.Infrastructure.Persistance.Users;

namespace NTMY.Infrastructure.Contexts.Configurations.Users
{
    public class UserEntityConfiguration : IEntityTypeConfiguration<UserEntity>
    {
        public void Configure(EntityTypeBuilder<UserEntity> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedNever();
            builder.Property(x => x.HeightUnit).HasMaxLength(20);
            builder.Property(x => x.WeightUnit).HasMaxLength(20);
            builder.Property(x => x.Email).HasMaxLength(255);
            builder.Property(x => x.UserName).HasMaxLength(255);
            builder.Property(x => x.FirstName).HasMaxLength(255);
            builder.Property(x => x.SecondName).HasMaxLength(255);
            builder.HasMany<UserLikeEntity>().WithOne().HasForeignKey(x => x.Id);
        }
    }
}
