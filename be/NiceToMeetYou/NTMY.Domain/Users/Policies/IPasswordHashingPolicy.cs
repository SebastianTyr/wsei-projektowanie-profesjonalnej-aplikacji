namespace NTMY.Domain.Users.Policies
{
    public interface IPasswordHashingPolicy
    {
        string HashPassword(string password);
        bool VerifyPassword(string password, string passwordHash);
    }
}
