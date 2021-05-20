using System;
using NTMY.Domain.Users.DataStructures;
using NTMY.Domain.Users.Policies;
using PlaygroundShared.Domain;
using PlaygroundShared.DomainEvents;

namespace NTMY.Domain.Users.Factories
{
    public class UserFactory : IUserFactory, IAggregateRecreate<User>
    {
        private readonly IDomainEventsManager _domainEventsManager;
        private readonly IPasswordHashingPolicyFactory _passwordHashingPolicyFactory;
        private readonly IPasswordPolicyFactory _passwordPolicyFactory;
        private readonly IUserDomainEventFactory _userDomainEventFactory;

        public UserFactory(IDomainEventsManager domainEventsManager, IPasswordHashingPolicyFactory passwordHashingPolicyFactory, IPasswordPolicyFactory passwordPolicyFactory, IUserDomainEventFactory userDomainEventFactory)
        {
            _domainEventsManager = domainEventsManager ?? throw new ArgumentNullException(nameof(domainEventsManager));
            _passwordHashingPolicyFactory = passwordHashingPolicyFactory ?? throw new ArgumentNullException(nameof(passwordHashingPolicyFactory));
            _passwordPolicyFactory = passwordPolicyFactory ?? throw new ArgumentNullException(nameof(passwordPolicyFactory));
            _userDomainEventFactory = userDomainEventFactory ?? throw new ArgumentNullException(nameof(userDomainEventFactory));
        }

        public User Create(UserDataStructure userDataStructure) => new User(userDataStructure, _domainEventsManager, _passwordHashingPolicyFactory, _passwordPolicyFactory, _userDomainEventFactory);

        public void Init(User aggregate)
        {
            aggregate.SetDependencies(_domainEventsManager, _passwordHashingPolicyFactory, _passwordPolicyFactory, _userDomainEventFactory);
        }
    }
}