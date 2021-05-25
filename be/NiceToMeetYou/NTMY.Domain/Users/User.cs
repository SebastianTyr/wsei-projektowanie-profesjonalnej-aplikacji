using System;
using NTMY.Domain.Users.DataStructures;
using NTMY.Domain.Users.Factories;
using NTMY.Domain.Users.Policies;
using NTMY.Domain.Users.Resources;
using NTMY.SharedKernel;
using PlaygroundShared.Domain;
using PlaygroundShared.DomainEvents;

namespace NTMY.Domain.Users
{
    public class User : BaseAggregateRoot
    {
        private IUserDomainEventFactory _userDomainEventFactory;
        private IPasswordHashingPolicyFactory _passwordHashingPolicyFactory;
        private IPasswordPolicyFactory _passwordPolicyFactory;

        public string UserName { get; private set; }
        public string PasswordHash { get; private set; }
        public string FirstName { get; private set; }
        public string SecondName { get; private set; }
        public string Email { get; private set; }
        public DateTime BirthDate { get; private set; }
        public Weight Weight { get; private set; }
        public Height Height { get; private set; }
        public Gender Gender { get; private set; }
        public bool IsConfirmed { get; private set; }
        public UserStatus Status { get; private set; }

        public User(
            UserDataStructure userDataStructure,
            IDomainEventsManager domainEventsManager,
            IPasswordHashingPolicyFactory passwordHashingPolicyFactory,
            IPasswordPolicyFactory passwordPolicyFactory,
            IUserDomainEventFactory userDomainEventFactory) : base(userDataStructure.Id, domainEventsManager)
        {
            SetDependencies(domainEventsManager, passwordHashingPolicyFactory, passwordPolicyFactory, userDomainEventFactory);
            AssignFromDataStructure(userDataStructure);
            SetUserCreated();

            DomainEvent(_userDomainEventFactory.PrepareUserCreatedEvent(this));
        }

        private User()
        {
            
        }

        public void SetDependencies(
            IDomainEventsManager domainEventsManager,
            IPasswordHashingPolicyFactory passwordHashingPolicyFactory,
            IPasswordPolicyFactory passwordPolicyFactory,
            IUserDomainEventFactory userDomainEventFactory)
        {
            base.SetDependencies(domainEventsManager);
            _passwordHashingPolicyFactory = passwordHashingPolicyFactory ?? throw new ArgumentNullException(nameof(passwordHashingPolicyFactory));
            _passwordPolicyFactory = passwordPolicyFactory ?? throw new ArgumentNullException(nameof(passwordPolicyFactory));
            _userDomainEventFactory = userDomainEventFactory ?? throw new ArgumentNullException(nameof(userDomainEventFactory));
        }

        public void SetPassword(string password, string confirmPassword)
        {
            if (!password.Equals(confirmPassword))
            {
                throw new BusinessLogicException(UserResources.PasswordsNotMatchMessage);
            }

            var policy = _passwordPolicyFactory.Create();
            if (!policy.Validate(password))
            {
                throw new BusinessLogicException(UserResources.PasswordNotMatchRulesMessage);
            }

            var hashingPolicy = _passwordHashingPolicyFactory.Create();
            PasswordHash = hashingPolicy.HashPassword(password);
        }

        public void Update(UserDataStructure userDataStructure)
        {
            AssignFromDataStructure(userDataStructure);
        }

        public void VerifyPassword(string password)
        {
            var hashingPolicy = _passwordHashingPolicyFactory.Create();

            if (!hashingPolicy.VerifyPassword(password, PasswordHash))
            {
                throw new BusinessLogicException(UserResources.IncorrectCredentialsMessage);
            }
        }

        public void ActivateUser()
        {
            if (!Status.Equals(UserStatus.Created))
            {
                throw new BusinessLogicException(UserResources.UserNotConfirmedMessage);
            }

            if (!IsConfirmed)
            {
                throw new BusinessLogicException(UserResources.UserNotConfirmedMessage);
            }

            var oldStatus = Status;
            Status = UserStatus.Active;

            DomainEvent(_userDomainEventFactory.PrepareUserStatusChangedEvent(this, oldStatus));
        }

        public void SuspendUser()
        {
            if (!Status.Equals(UserStatus.Active))
            {
                throw new BusinessLogicException(UserResources.UserNotConfirmedMessage);
            }

            var oldStatus = Status;
            Status = UserStatus.Suspended;

            DomainEvent(_userDomainEventFactory.PrepareUserStatusChangedEvent(this, oldStatus));
        }

        private void SetUserCreated()
        {
            Status = UserStatus.Created;
            IsConfirmed = true;
        }

        private void AssignFromDataStructure(UserDataStructure userDataStructure)
        {
            SetUserName(userDataStructure.UserName);
            SetFirstName(userDataStructure.FirstName);
            SetSecondName(userDataStructure.SecondName);
            SetEmail(userDataStructure.Email);
            BirthDate = userDataStructure.BirthDate;
            Weight = userDataStructure.Weight;
            Height = userDataStructure.Height;
            Gender = userDataStructure.Gender;
        }

        private void SetEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                throw new ArgumentNullException(nameof(email));
            }

            Email = email;
        }

        private void SetSecondName(string secondName)
        {
            if (string.IsNullOrWhiteSpace(secondName))
            {
                throw new ArgumentNullException(nameof(secondName));
            }

            SecondName = secondName;
        }

        private void SetFirstName(string firstName)
        {
            if (string.IsNullOrWhiteSpace(firstName))
            {
                throw new ArgumentNullException(nameof(firstName));
            }

            FirstName = firstName;
        }

        private void SetUserName(string userName)
        {
            if (string.IsNullOrWhiteSpace(userName))
            {
                throw new ArgumentNullException(nameof(userName));
            }

            UserName = userName;
        }
    }
}
