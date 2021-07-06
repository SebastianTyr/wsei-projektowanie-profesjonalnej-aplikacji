using System;
using System.Threading.Tasks;
using NTMY.Application.Interfaces.Pairs.Commands;
using NTMY.Application.Interfaces.Users;
using NTMY.Application.Interfaces.Users.Commands;
using NTMY.SharedKernel;
using PlaygroundShared.Application.CQRS;

namespace NTMY.Application.Users.Handlers
{
    public class AddUserLikeCommandHandler : ICommandHandler<AddUserLikeCommand>
    {
        private readonly IUserService _userService;
        private readonly ICommandDispatcher _commandDispatcher;

        public AddUserLikeCommandHandler(IUserService userService, ICommandDispatcher commandDispatcher)
        {
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
            _commandDispatcher = commandDispatcher ?? throw new ArgumentNullException(nameof(commandDispatcher));
        }
        public async Task HandleAsync(AddUserLikeCommand command)
        {
            await _userService.AddUserLikeAsync(command.LikedUserId);
            try
            {
                await _commandDispatcher.DispatchAsync(new AddPairCommand(command.LikedUserId));
            }
            catch(BusinessLogicException)
            {
                // ignored
            }
        }
    }
}