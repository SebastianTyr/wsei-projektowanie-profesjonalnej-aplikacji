using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using NTMY.Application.Interfaces.Notifications;
using NTMY.Application.Notifications.Hubs;
using NTMY.Application.Notifications.Responses;
using PlaygroundShared.Domain;
using PlaygroundShared.Infrastructure;

namespace NTMY.Application.Notifications
{
    public class PairMessageNotificationService : IPairMessageNotificationService
    {
        private readonly IHubContext<PairMessagesHub> _hubContext;
        private readonly ICorrelationContext _correlationContext;

        public PairMessageNotificationService(IHubContext<PairMessagesHub> hubContext, ICorrelationContext correlationContext)
        {
            _hubContext = hubContext ?? throw new ArgumentNullException(nameof(hubContext));
            _correlationContext = correlationContext ?? throw new ArgumentNullException(nameof(correlationContext));
        }

        public async Task SendMessageAsync(AggregateId toUserId, AggregateId pairId, string message)
        {
            await _hubContext.Clients.User(toUserId.ToString()).SendAsync("messageArrived", new PairMessageReceivedResponse()
            {
                FromUserId = _correlationContext.CurrentUser.UserId.Value.ToGuid(),
                Message = message,
                PairId = pairId.ToGuid(),
                ToUserId = toUserId.ToGuid()
            });
        }
    }
}
