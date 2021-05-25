using PlaygroundShared.Domain;
using PlaygroundShared.DomainEvents;

namespace NTMY.Domain.Users.Events
{
    public class UserStatusChangedEvent : IDomainEvent
    {
        public AggregateId Id { get; private set; }
        public UserStatus OldStatus { get; private set; }
        public UserStatus NewStatus { get; private set; }

        public UserStatusChangedEvent(AggregateId id, UserStatus oldStatus, UserStatus newStatus)
        {
            Id = id;
            OldStatus = oldStatus;
            NewStatus = newStatus;
        }

        private UserStatusChangedEvent()
        {

        }
    }
}