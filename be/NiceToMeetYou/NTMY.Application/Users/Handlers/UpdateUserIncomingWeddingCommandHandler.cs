using System;
using System.Threading.Tasks;
using NTMY.Application.Interfaces.Users;
using NTMY.Application.Interfaces.Users.Commands;
using PlaygroundShared.Application.CQRS;

namespace NTMY.Application.Users.Handlers
{
    public class UpdateUserIncomingWeddingCommandHandler : ICommandHandler<UpdateUserIncomingWeddingCommand>
    {
        private readonly IUserService _userService;

        public UpdateUserIncomingWeddingCommandHandler(IUserService userService)
        {
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
        }

        public async Task HandleAsync(UpdateUserIncomingWeddingCommand command)
        {
            await _userService.UpdateUserIncomingWeddingAsync(command.No, command.Date, command.Address, command.Description);
        }
    }
}