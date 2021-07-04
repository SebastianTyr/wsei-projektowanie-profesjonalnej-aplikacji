using System;
using System.Collections.Generic;
using GeoCoordinatePortable;
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
        public bool IsConfirmed { get; set; }
        public UserStatus Status { get; set; }
        public Gender WantedGender { get; set; }
        public string Description { get; set; }
        public double CoordinateLongitude { get; set; }
        public double CoordinateLatitude { get; set; }
        public DateTime? LastLoginDate { get; set; }
        public string AddressStreet { get; set; }
        public string AddressCity { get; set; }
        public string AddressPostCode { get; set; }
        public string AddressCountry { get; set; }
        public virtual List<UserLikeEntity> Likes { get; set; }
    }
}
