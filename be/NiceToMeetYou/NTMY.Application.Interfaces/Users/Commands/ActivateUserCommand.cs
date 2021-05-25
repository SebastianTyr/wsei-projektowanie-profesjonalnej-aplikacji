using PlaygroundShared.Application.CQRS;
using PlaygroundShared.Domain;

namespace NTMY.Application.Interfaces.Users.Commands
{
    public class ActivateUserCommand : ICommand
    {
        public AggregateId Id { get; }

        public ActivateUserCommand(AggregateId id)
        {
            Id = id;
        }
    }
}
