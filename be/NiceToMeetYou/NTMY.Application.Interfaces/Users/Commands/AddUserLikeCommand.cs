using PlaygroundShared.Application.CQRS;
using PlaygroundShared.Domain;

namespace NTMY.Application.Interfaces.Users.Commands
{
    public class AddUserLikeCommand : ICommand
    {
        public AggregateId LikedUserId { get; }

        public AddUserLikeCommand(AggregateId likedUserId)
        {
            LikedUserId = likedUserId;
        }
    }
}