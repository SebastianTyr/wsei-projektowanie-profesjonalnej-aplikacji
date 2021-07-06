using NTMY.Domain.Users.Events;

namespace NTMY.Domain.Users.Factories
{
    public interface IUserDomainEventFactory
    {
        UserCreatedEvent PrepareUserCreatedEvent(User user);
        UserStatusChangedEvent PrepareUserStatusChangedEvent(User user, UserStatus oldStatus);
        UserLikeAddedEvent PrepareUserLikeAddedEvent(User user, UserLike userLike);
        UserLikeRemovedEvent PrepareUserLikeRemovedEvent(User user, UserLike userLike);
    }
}