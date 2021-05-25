using System;
using System.Threading.Tasks;
using NTMY.Application.Interfaces.Users;
using NTMY.Application.Interfaces.Users.Commands;
using PlaygroundShared.Application.CQRS;

namespace NTMY.Application.Users.Handlers
{
    public class ActivateUserCommandHandler : ICommandHandler<ActivateUserCommand>
    {
        private readonly IUserService _userService;

        public ActivateUserCommandHandler(IUserService userService)
        {
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
        }

        public async Task HandleAsync(ActivateUserCommand command)
        {
            await _userService.ActivateUserAsync(command.Id);
        }
    }
}
