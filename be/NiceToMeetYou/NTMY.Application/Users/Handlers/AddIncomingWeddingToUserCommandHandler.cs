using System;
using System.Threading.Tasks;
using NTMY.Application.Interfaces.Users;
using NTMY.Application.Interfaces.Users.Commands;
using PlaygroundShared.Application.CQRS;

namespace NTMY.Application.Users.Handlers
{
    public class AddIncomingWeddingToUserCommandHandler : ICommandHandler<AddIncomingWeddingToUserCommand>
    {
        private readonly IUserService _userService;

        public AddIncomingWeddingToUserCommandHandler(IUserService userService)
        {
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
        }

        public async Task HandleAsync(AddIncomingWeddingToUserCommand command)
        {
            await _userService.AddUserIncomingWeddingAsync(command.Date, command.Address, command.Description);
        }
    }
}