namespace NTMY.Domain.Users.Policies
{
    public interface IPasswordPolicyFactory
    {
        IPasswordPolicy Create();
    }
}