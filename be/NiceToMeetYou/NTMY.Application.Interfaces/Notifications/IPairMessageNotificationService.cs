using System.Threading.Tasks;
using PlaygroundShared.Application.Services;
using PlaygroundShared.Domain;

namespace NTMY.Application.Interfaces.Notifications
{
    public interface IPairMessageNotificationService : IService
    {
        Task SendMessageAsync(AggregateId toUserId, AggregateId pairId, string message);
    }
}
