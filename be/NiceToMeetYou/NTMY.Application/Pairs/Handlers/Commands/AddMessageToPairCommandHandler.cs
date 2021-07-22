using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using NTMY.Application.Interfaces.Notifications;
using NTMY.Application.Interfaces.Pairs;
using NTMY.Application.Interfaces.Pairs.Commands;
using PlaygroundShared.Application.CQRS;

namespace NTMY.Application.Pairs.Handlers.Commands
{
    public class AddMessageToPairCommandHandler : ICommandHandler<AddMessageToPairCommand>
    {
        private readonly IPairService _pairService;
        private readonly IPairMessageNotificationService _pairMessageNotificationService;

        public AddMessageToPairCommandHandler(IPairService pairService, IPairMessageNotificationService pairMessageNotificationService)
        {
            _pairService = pairService ?? throw new ArgumentNullException(nameof(pairService));
            _pairMessageNotificationService = pairMessageNotificationService ?? throw new ArgumentNullException(nameof(pairMessageNotificationService));
        }

        public async Task HandleAsync(AddMessageToPairCommand command)
        {
            var messageNo = await _pairService.AddMessageToPairAsync(command.PairId, command.ToUserId, command.Message);
            await _pairMessageNotificationService.SendMessageAsync(command.ToUserId, command.PairId, command.Message, messageNo);
        }
    }
}
