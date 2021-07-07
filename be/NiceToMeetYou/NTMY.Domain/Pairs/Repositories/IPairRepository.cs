using System.Threading.Tasks;
using PlaygroundShared.Domain;

namespace NTMY.Domain.Pairs.Repositories
{
    public interface IPairRepository : IAggregateRepository<Pair>, IRepository
    {
        Task<Pair> GetPairForUsersAsync(AggregateId firstUserId, AggregateId secondUserId);
    }
}
