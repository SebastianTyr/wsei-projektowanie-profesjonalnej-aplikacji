using System;
using System.Threading.Tasks;
using NTMY.Application.Interfaces.Users;
using NTMY.Application.Interfaces.Users.Commands;
using PlaygroundShared.Application.CQRS;

namespace NTMY.Application.Users.Handlers
{
    public class AddUserLikeCommandHandler : ICommandHandler<AddUserLikeCommand>
    {
        private readonly IUserService _userService;

        public AddUserLikeCommandHandler(IUserService userService)
        {
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
        }
        public async Task HandleAsync(AddUserLikeCommand command)
        {
            await _userService.AddUserLikeAsync(command.LikedUserId);
        }
    }
}