namespace NTMY.Domain.Users.Policies
{
    public class PasswordHashingPolicyFactory : IPasswordHashingPolicyFactory
    {
        public IPasswordHashingPolicy Create() => new BCryptPasswordHashingPolicy();
    }
}