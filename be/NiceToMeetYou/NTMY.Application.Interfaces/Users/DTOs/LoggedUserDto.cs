using System;

namespace NTMY.Application.Interfaces.Users.DTOs
{
    public class LoggedUserDto
    {
        public Guid Id { get; }
        public string UserName { get; }
        public string Email { get; }
        public string FirstName { get; }
        public string SecondName { get;}
        public string JwtToken { get; }

        public LoggedUserDto(Guid id, string userName, string email, string firstName, string secondName, string jwtToken)
        {
            Id = id;
            UserName = userName;
            Email = email;
            FirstName = firstName;
            SecondName = secondName;
            JwtToken = jwtToken;
        }
    }
}
