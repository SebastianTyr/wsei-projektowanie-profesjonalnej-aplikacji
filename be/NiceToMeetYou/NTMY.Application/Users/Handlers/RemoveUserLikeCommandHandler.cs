using System;
using System.Threading.Tasks;
using NTMY.Application.Interfaces.Users;
using NTMY.Application.Interfaces.Users.Commands;
using PlaygroundShared.Application.CQRS;

namespace NTMY.Application.Users.Handlers
{
    public class RemoveUserLikeCommandHandler : ICommandHandler<RemoveUserLikeCommand>
    {
        private readonly IUserService _userService;

        public RemoveUserLikeCommandHandler(IUserService userService)
        {
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
        }
        public async Task HandleAsync(RemoveUserLikeCommand command)
        {
            await _userService.RemoveUserLikeAsync(command.LikeNo);
        }
    }
}