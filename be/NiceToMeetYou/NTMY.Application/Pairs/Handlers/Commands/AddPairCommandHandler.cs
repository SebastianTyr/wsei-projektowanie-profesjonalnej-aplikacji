using System;
using System.Threading.Tasks;
using NTMY.Application.Interfaces.Notifications;
using NTMY.Application.Interfaces.Pairs;
using NTMY.Application.Interfaces.Pairs.Commands;
using PlaygroundShared.Application.CQRS;
using PlaygroundShared.Infrastructure;

namespace NTMY.Application.Pairs.Handlers.Commands
{
    public class AddPairCommandHandler : ICommandHandler<AddPairCommand>
    {
        private readonly IPairService _pairService;
        private readonly IPairMessageNotificationService _pairMessageNotificationService;
        private readonly ICorrelationContext _correlationContext;

        public AddPairCommandHandler(IPairService pairService, IPairMessageNotificationService pairMessageNotificationService, ICorrelationContext correlationContext)
        {
            _pairService = pairService ?? throw new ArgumentNullException(nameof(pairService));
            _pairMessageNotificationService = pairMessageNotificationService ?? throw new ArgumentNullException(nameof(pairMessageNotificationService));
            _correlationContext = correlationContext ?? throw new ArgumentNullException(nameof(correlationContext));
        }

        public async Task HandleAsync(AddPairCommand command)
        {
            await _pairService.AddPairToCurrentUserAsync(command.Id, command.LikedUserId);
            await _pairMessageNotificationService.SendPairCreatedNotificationAsync(command.Id, _correlationContext.CurrentUser.UserId.Value, command.LikedUserId);
        }
    }
}
