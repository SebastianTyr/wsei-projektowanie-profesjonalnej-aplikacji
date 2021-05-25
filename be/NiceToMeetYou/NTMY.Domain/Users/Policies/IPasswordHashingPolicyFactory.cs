namespace NTMY.Domain.Users.Policies
{
    public interface IPasswordHashingPolicyFactory
    {
        IPasswordHashingPolicy Create();
    }
}