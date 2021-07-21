using System;
using System.Collections.Generic;
using NTMY.Domain.Users;

namespace NTMY.Web.ViewModels.Users
{
    public class CurrentUserViewModel
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public Gender Gender { get; set; }
        public Gender WantedGender { get; set; }
        public DateTime BirthDate { get; set; }
        public WeightViewModel Weight { get; set; }
        public HeightViewModel Height { get; set; }
        public bool IsConfirmed { get; set; }
        public string Description { get; set; }
        public CoordinateViewModel Coordinate { get; set; }
        public AddressViewModel Address { get; set; }
        public List<UserPhotoViewModel> Photos { get; set; }
        public List<CurrentUserWeddingViewModel> Weddings { get; set; }
    }
}