using PlaygroundShared.Domain;
using PlaygroundShared.DomainEvents;

namespace NTMY.Domain.Users.Events
{
    public class UserLikeRemovedEvent : IDomainEvent
    {
        public AggregateId Id { get; private set; }
        public int No { get; private set; }
        public AggregateId LikedUserId { get; private set; }

        public UserLikeRemovedEvent(AggregateId id, int no, AggregateId likedUserId)
        {
            Id = id;
            No = no;
            LikedUserId = likedUserId;
        }

        private UserLikeRemovedEvent()
        {

        }
    }
}