using System;
using System.Collections.Generic;
using System.Linq;
using GeoCoordinatePortable;
using NTMY.Domain.Users;

namespace NTMY.Application.Interfaces.Users.DTOs
{
    public class CurrentUserInfoDto
    {
        public Guid Id { get; }
        public string UserName { get; }
        public string Email { get; }
        public string FirstName { get; }
        public string SecondName { get; }
        public Gender Gender { get; }
        public Gender WantedGender { get; }
        public DateTime BirthDate { get; }
        public Weight Weight { get; }
        public Height Height { get; }
        public bool IsConfirmed { get; }
        public string Description { get; }
        public double Longitude { get; }
        public double Latitude { get;  }
        public Address Address { get; }
        public List<UserPhotoDto> Photos { get; }
        public List<CurrentUserWeddingDto> Weddings { get; }

        public CurrentUserInfoDto(Guid id, string userName, string email, string firstName, string secondName, Gender gender, Gender wantedGender, DateTime birthDate, Weight weight, Height height, bool isConfirmed, string description, GeoCoordinate geoCoordinate, Address address, IEnumerable<UserPhotoDto> photos, IEnumerable<CurrentUserWeddingDto> weddings)
        {
            Id = id;
            UserName = userName;
            Email = email;
            FirstName = firstName;
            SecondName = secondName;
            Gender = gender;
            WantedGender = wantedGender;
            BirthDate = birthDate;
            Weight = weight;
            Height = height;
            IsConfirmed = isConfirmed;
            Description = description;
            Longitude = geoCoordinate.Longitude;
            Latitude = geoCoordinate.Latitude;
            Address = address;
            Photos = photos.ToList();
            Weddings = weddings.ToList();
        }
    }
}
