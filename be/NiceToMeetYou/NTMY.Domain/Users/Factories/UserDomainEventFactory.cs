using NTMY.Domain.Users.Events;

namespace NTMY.Domain.Users.Factories
{
    public class UserDomainEventFactory : IUserDomainEventFactory
    {
        public UserCreatedEvent PrepareUserCreatedEvent(User user) => new UserCreatedEvent(user.Id, user.UserName, user.FirstName, user.SecondName, user.Email);
        public UserStatusChangedEvent PrepareUserStatusChangedEvent(User user, UserStatus oldStatus) => new UserStatusChangedEvent(user.Id, oldStatus, user.Status);
    }
}