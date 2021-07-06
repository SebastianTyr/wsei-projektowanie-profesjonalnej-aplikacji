using PlaygroundShared.Domain;
using PlaygroundShared.DomainEvents;

namespace NTMY.Domain.Users.Events
{
    public class UserLikeAddedEvent : IDomainEvent
    {
        public AggregateId Id { get; private set; }
        public AggregateId LikedUserId { get; private set; }

        public UserLikeAddedEvent(AggregateId id, AggregateId likedUserId)
        {
            Id = id;
            LikedUserId = likedUserId;
        }

        private UserLikeAddedEvent()
        {

        }
    }
}