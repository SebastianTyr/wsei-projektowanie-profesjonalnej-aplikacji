using NTMY.Domain.Users.Events;

namespace NTMY.Domain.Users.Factories
{
    public interface IUserDomainEventFactory
    {
        UserCreatedEvent PrepareUserCreatedEvent(User user);
        UserStatusChangedEvent PrepareUserStatusChangedEvent(User user, UserStatus oldStatus);
    }
}