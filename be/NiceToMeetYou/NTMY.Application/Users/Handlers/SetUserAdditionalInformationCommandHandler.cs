using System;
using System.Threading.Tasks;
using NTMY.Application.Interfaces.Users;
using NTMY.Application.Interfaces.Users.Commands;
using NTMY.Domain.Users.DataStructures;
using PlaygroundShared.Application.CQRS;

namespace NTMY.Application.Users.Handlers
{
    public class SetUserAdditionalInformationCommandHandler : ICommandHandler<SetUserAdditionalInformationCommand>
    {
        private readonly IUserService _userService;

        public SetUserAdditionalInformationCommandHandler(IUserService userService)
        {
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
        }

        public async Task HandleAsync(SetUserAdditionalInformationCommand command)
        {
            await _userService.SetAdditionalInformationAsync(new UserAdditionalInformationDataStructure(command.Height, command.Weight, command.Address, command.Description, command.WantedGender, command.Coordinate));
        }
    }
}