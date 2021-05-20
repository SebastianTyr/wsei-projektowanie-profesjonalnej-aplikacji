namespace NTMY.Domain.Users.Policies
{
    public interface IPasswordPolicy
    {
        bool Validate(string password);
    }
}
