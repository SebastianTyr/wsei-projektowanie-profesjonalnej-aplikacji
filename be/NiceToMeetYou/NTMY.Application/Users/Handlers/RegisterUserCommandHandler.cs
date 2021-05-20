using System;
using System.Threading.Tasks;
using NTMY.Application.Interfaces.Users;
using NTMY.Application.Interfaces.Users.Commands;
using NTMY.Domain.Users.DataStructures;
using PlaygroundShared.Application.CQRS;

namespace NTMY.Application.Users.Handlers
{
    public class RegisterUserCommandHandler : ICommandHandler<RegisterUserCommand>
    {
        private readonly IUserService _userService;

        public RegisterUserCommandHandler(IUserService userService)
        {
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
        }

        public async Task HandleAsync(RegisterUserCommand command)
        {
            await _userService.RegisterUserAsync(
                new UserDataStructure(
                    command.Id,
                    command.UserName,
                    command.FirstName,
                    command.SecondName,
                    command.Email,
                    command.BirthDate,
                    command.Weight,
                    command.Height,
                    command.Gender),
                command.Password,
                command.ConfirmPassword);
        }
    }
}
