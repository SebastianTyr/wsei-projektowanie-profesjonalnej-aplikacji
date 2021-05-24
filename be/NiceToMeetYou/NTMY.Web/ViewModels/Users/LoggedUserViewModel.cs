using System;

namespace NTMY.Web.ViewModels.Users
{
    public class LoggedUserViewModel
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string JwtToken { get; set; }
    }
}