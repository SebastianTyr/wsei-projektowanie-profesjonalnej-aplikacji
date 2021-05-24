using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NTMY.Domain.Users;

namespace NTMY.Web.ViewModels.Users
{
    public class RegisterUserViewModel
    {
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string Email { get; set; }
        public Gender Gender { get; set; }
        public WeightViewModel Weight { get; set; }
        public HeightViewModel Height { get; set; }
        public DateTime BirthDate { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
