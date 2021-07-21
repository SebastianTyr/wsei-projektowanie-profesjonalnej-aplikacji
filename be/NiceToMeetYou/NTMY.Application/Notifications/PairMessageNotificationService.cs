using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using NTMY.Application.Interfaces.Notifications;
using NTMY.Application.Notifications.Hubs;
using NTMY.Application.Notifications.Responses;
using NTMY.Domain.Users.Repositories;
using PlaygroundShared.Domain;
using PlaygroundShared.Infrastructure;

namespace NTMY.Application.Notifications
{
    public class PairMessageNotificationService : IPairMessageNotificationService
    {
        private readonly IHubContext<PairMessagesHub> _hubContext;
        private readonly ICorrelationContext _correlationContext;
        private readonly IUserRepository _userRepository;

        public PairMessageNotificationService(IHubContext<PairMessagesHub> hubContext, ICorrelationContext correlationContext, IUserRepository userRepository)
        {
            _hubContext = hubContext ?? throw new ArgumentNullException(nameof(hubContext));
            _correlationContext = correlationContext ?? throw new ArgumentNullException(nameof(correlationContext));
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
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

        public async Task SendPairCreatedNotificationAsync(AggregateId pairId, AggregateId firstUserId, AggregateId secondUserId)
        {
            var firstUser = await _userRepository.GetAsync(firstUserId);
            var secondUser = await _userRepository.GetAsync(secondUserId);
            await _hubContext.Clients.Users(firstUserId.ToString(), secondUserId.ToString()).SendAsync("pairCreated",
                new PairCreatedResponse()
                {
                    PairId = pairId.Id,
                    FirstUserFirstName = firstUser?.FirstName,
                    FirstUserId = firstUserId.Id,
                    SecondUserFirstName = secondUser?.FirstName,
                    SecondUserId = secondUserId.Id
                });
        }
    }
}
