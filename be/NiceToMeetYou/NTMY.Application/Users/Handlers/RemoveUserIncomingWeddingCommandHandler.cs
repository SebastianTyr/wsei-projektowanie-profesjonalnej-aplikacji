using System;
using System.Threading.Tasks;
using NTMY.Application.Interfaces.Users;
using NTMY.Application.Interfaces.Users.Commands;
using PlaygroundShared.Application.CQRS;

namespace NTMY.Application.Users.Handlers
{
    public class RemoveUserIncomingWeddingCommandHandler : ICommandHandler<RemoveUserIncomingWeddingCommand>
    {
        private readonly IUserService _userService;

        public RemoveUserIncomingWeddingCommandHandler(IUserService userService)
        {
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
        }

        public async Task HandleAsync(RemoveUserIncomingWeddingCommand command)
        {
            await _userService.RemoveUserIncomingWeddingAsync(command.No);
        }
    }
}