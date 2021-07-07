using System.Threading.Tasks;
using PlaygroundShared.Application.Services;
using PlaygroundShared.Domain;

namespace NTMY.Application.Interfaces.Pairs
{
    public interface IPairService : IService
    {
        Task AddPairToCurrentUserAsync(AggregateId id, AggregateId userId);
        Task AddMessageToPairAsync(AggregateId pairId, AggregateId toUserId, string message);
    }
}
