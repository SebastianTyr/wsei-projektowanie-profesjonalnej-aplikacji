using System.Threading.Tasks;
using PlaygroundShared.Domain;

namespace NTMY.Domain.Users.Repositories
{
    public interface IUserRepository : IAggregateRepository<User>, IRepository
    {
        Task<User> GetUserByEmailAsync(string email);
    }
}
