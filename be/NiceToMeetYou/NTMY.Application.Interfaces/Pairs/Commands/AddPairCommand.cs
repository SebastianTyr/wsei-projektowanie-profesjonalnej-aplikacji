using PlaygroundShared.Application.CQRS;
using PlaygroundShared.Domain;

namespace NTMY.Application.Interfaces.Pairs.Commands
{
    public class AddPairCommand : ICommand
    {
        public AggregateId Id { get; }
        public AggregateId LikedUserId { get; }

        public AddPairCommand(AggregateId likedUserId)
        {
            Id = AggregateId.Generate();
            LikedUserId = likedUserId;
        }
    }
}
