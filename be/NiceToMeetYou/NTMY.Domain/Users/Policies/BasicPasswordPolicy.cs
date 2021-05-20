namespace NTMY.Domain.Users.Policies
{
    public class BasicPasswordPolicy : IPasswordPolicy
    {
        public bool Validate(string password) => password.Length > 8 && password.Length < 100;
    }
}