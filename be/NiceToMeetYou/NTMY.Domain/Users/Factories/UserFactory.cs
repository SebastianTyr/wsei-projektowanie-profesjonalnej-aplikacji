using System;
using NTMY.Domain.Users.DataStructures;
using NTMY.Domain.Users.Policies;
using PlaygroundShared;
using PlaygroundShared.Domain;
using PlaygroundShared.DomainEvents;
using PlaygroundShared.Infrastructure;

namespace NTMY.Domain.Users.Factories
{
    public class UserFactory : IUserFactory, IAggregateRecreate<User>
    {
        private readonly IDomainEventsManager _domainEventsManager;
        private readonly IPasswordHashingPolicyFactory _passwordHashingPolicyFactory;
        private readonly IPasswordPolicyFactory _passwordPolicyFactory;
        private readonly IUserDomainEventFactory _userDomainEventFactory;
        private ICorrelationContext _correlationContext;

        public UserFactory(IDomainEventsManager domainEventsManager,
            IPasswordHashingPolicyFactory passwordHashingPolicyFactory, IPasswordPolicyFactory passwordPolicyFactory,
            IUserDomainEventFactory userDomainEventFactory, ICorrelationContext correlationContext)
        {
            _domainEventsManager = domainEventsManager ?? throw new ArgumentNullException(nameof(domainEventsManager));
            _passwordHashingPolicyFactory = passwordHashingPolicyFactory ?? throw new ArgumentNullException(nameof(passwordHashingPolicyFactory));
            _passwordPolicyFactory = passwordPolicyFactory ?? throw new ArgumentNullException(nameof(passwordPolicyFactory));
            _userDomainEventFactory = userDomainEventFactory ?? throw new ArgumentNullException(nameof(userDomainEventFactory));
            _correlationContext = correlationContext;
        }

        public User Create(UserDataStructure userDataStructure) => new User(userDataStructure, _domainEventsManager, _passwordHashingPolicyFactory, _passwordPolicyFactory, _userDomainEventFactory, _correlationContext);

        public void Init(User aggregate)
        {
            aggregate.SetDependencies(_domainEventsManager, _passwordHashingPolicyFactory, _passwordPolicyFactory, _userDomainEventFactory, _correlationContext);
        }
    }
}