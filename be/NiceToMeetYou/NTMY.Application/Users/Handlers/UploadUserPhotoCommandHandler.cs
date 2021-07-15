using System;
using System.Threading.Tasks;
using NTMY.Application.Interfaces.Users;
using NTMY.Application.Interfaces.Users.Commands;
using PlaygroundShared.Application.CQRS;

namespace NTMY.Application.Users.Handlers
{
    public class UploadUserPhotoCommandHandler : ICommandHandler<UploadUserPhotoCommand>
    {
        private readonly IUserService _userService;

        public UploadUserPhotoCommandHandler(IUserService userService)
        {
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
        }

        public async Task HandleAsync(UploadUserPhotoCommand command)
        {
            await _userService.AddPhotoAsync(command.FormFile);
        }
    }
}