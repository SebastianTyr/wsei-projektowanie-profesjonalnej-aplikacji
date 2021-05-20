using PlaygroundShared.Domain;
using PlaygroundShared.DomainEvents;

namespace NTMY.Domain.Users.Events
{
    public class UserCreatedEvent : IDomainEvent
    {
        public AggregateId Id { get; private set; }
        public string UserName { get; private set; }
        public string FirstName { get; private set; }
        public string SecondName { get; private set; }
        public string Email { get; private set; }

        public UserCreatedEvent(AggregateId id, string userName, string firstName, string secondName, string email)
        {
            Id = id;
            UserName = userName;
            FirstName = firstName;
            SecondName = secondName;
            Email = email;
        }

        private UserCreatedEvent()
        {
        }
    }
}
