namespace NTMY.Domain.Users.Policies
{
    public class PasswordPolicyFactory : IPasswordPolicyFactory
    {
        public IPasswordPolicy Create() => new BasicPasswordPolicy();
    }
}