using System;
using NTMY.Domain.Users;
using PlaygroundShared.Infrastructure.Persistance;

namespace NTMY.Infrastructure.Persistance.Users
{
    public class UserEntity : BaseAggregateDbEntity
    {
        public string UserName { get; set; }
        public string PasswordHash { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string Email { get; set; }
        public DateTime BirthDate { get; set; }
        public decimal WeightValue { get; set; }
        public string WeightUnit { get; set; }
        public decimal HeightValue { get; set; }
        public string HeightUnit { get; set; }
        public Gender Gender { get; set; }
    }
}
