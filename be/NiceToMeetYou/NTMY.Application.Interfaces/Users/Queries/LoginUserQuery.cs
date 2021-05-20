using PlaygroundShared.Application.CQRS;

namespace NTMY.Application.Interfaces.Users.Queries
{
    public class LoginUserQuery : IQuery
    {
        public string Email { get; }
        public string Password { get; }

        public LoginUserQuery(string email, string password)
        {
            Email = email;
            Password = password;
        }
    }
}
