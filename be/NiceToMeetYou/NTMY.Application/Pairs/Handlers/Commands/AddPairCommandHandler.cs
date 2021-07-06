using System;
using System.Threading.Tasks;
using NTMY.Application.Interfaces.Pairs;
using NTMY.Application.Interfaces.Pairs.Commands;
using PlaygroundShared.Application.CQRS;

namespace NTMY.Application.Pairs.Handlers.Commands
{
    public class AddPairCommandHandler : ICommandHandler<AddPairCommand>
    {
        private readonly IPairService _pairService;

        public AddPairCommandHandler(IPairService pairService)
        {
            _pairService = pairService ?? throw new ArgumentNullException(nameof(pairService));
        }

        public async Task HandleAsync(AddPairCommand command)
        {
            await _pairService.AddPairToCurrentUserAsync(command.Id, command.LikedUserId);
        }
    }
}
