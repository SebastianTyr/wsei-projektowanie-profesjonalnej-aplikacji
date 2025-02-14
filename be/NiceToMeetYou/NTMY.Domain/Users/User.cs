﻿using System;
using System.Collections.Generic;
using System.Linq;
using GeoCoordinatePortable;
using NTMY.Domain.Users.DataStructures;
using NTMY.Domain.Users.Factories;
using NTMY.Domain.Users.Policies;
using NTMY.Domain.Users.Resources;
using NTMY.SharedKernel;
using PlaygroundShared;
using PlaygroundShared.Domain;
using PlaygroundShared.DomainEvents;
using PlaygroundShared.Infrastructure;

namespace NTMY.Domain.Users
{
    public class User : BaseAggregateRoot
    {
        private IUserDomainEventFactory _userDomainEventFactory;
        private IPasswordHashingPolicyFactory _passwordHashingPolicyFactory;
        private IPasswordPolicyFactory _passwordPolicyFactory;
        private ICorrelationContext _correlationContext;

        public string UserName { get; private set; }
        public string PasswordHash { get; private set; }
        public string FirstName { get; private set; }
        public string SecondName { get; private set; }
        public string Email { get; private set; }
        public DateTime BirthDate { get; private set; }
        public Weight Weight { get; private set; }
        public Height Height { get; private set; }
        public Gender Gender { get; private set; }
        public Gender WantedGender { get; private set; } = Gender.Other;
        public bool IsConfirmed { get; private set; }
        public UserStatus Status { get; private set; }
        public string Description { get; private set; }
        public GeoCoordinate Coordinate { get; private set; }
        public DateTime? LastLoginDate { get; private set; }
        public Address Address { get; private set; }

        private List<Wedding> _incomingWeddings = new List<Wedding>();
        public IEnumerable<Wedding> IncomingWeddings
        {
            get => _incomingWeddings;
            private set => _incomingWeddings = value.ToList();
        }

        private List<UserLike> _likes = new List<UserLike>();
        public IEnumerable<UserLike> Likes
        {
            get => _likes;
            private set => _likes = value.ToList();
        }

        private List<UserRating> _ratings = new List<UserRating>();
        public IEnumerable<UserRating> Ratings
        {
            get => _ratings;
            private set => _ratings = value.ToList();
        }

        private List<UserPhoto> _photos = new List<UserPhoto>();

        public IEnumerable<UserPhoto> Photos
        {
            get => _photos;
            private set => _photos = value.ToList();
        }

        public User(
            UserDataStructure userDataStructure,
            IDomainEventsManager domainEventsManager,
            IPasswordHashingPolicyFactory passwordHashingPolicyFactory,
            IPasswordPolicyFactory passwordPolicyFactory,
            IUserDomainEventFactory userDomainEventFactory,
            ICorrelationContext correlationContext) : base(userDataStructure.Id, domainEventsManager)
        {
            SetDependencies(domainEventsManager, passwordHashingPolicyFactory, passwordPolicyFactory, userDomainEventFactory, correlationContext);
            AssignFromDataStructure(userDataStructure);
            SetUserCreated();
            ActivateUser();

            DomainEvent(_userDomainEventFactory.PrepareUserCreatedEvent(this));
        }

        private User()
        {
            
        }

        public void SetDependencies(IDomainEventsManager domainEventsManager,
            IPasswordHashingPolicyFactory passwordHashingPolicyFactory,
            IPasswordPolicyFactory passwordPolicyFactory,
            IUserDomainEventFactory userDomainEventFactory,
            ICorrelationContext correlationContext)
        {
            base.SetDependencies(domainEventsManager);
            _passwordHashingPolicyFactory = passwordHashingPolicyFactory ?? throw new ArgumentNullException(nameof(passwordHashingPolicyFactory));
            _passwordPolicyFactory = passwordPolicyFactory ?? throw new ArgumentNullException(nameof(passwordPolicyFactory));
            _userDomainEventFactory = userDomainEventFactory ?? throw new ArgumentNullException(nameof(userDomainEventFactory));
            _correlationContext = correlationContext ?? throw new ArgumentNullException(nameof(correlationContext));

            Weight = Weight.Empty();
            Height = Height.Empty();
        }

        public void SetAdditionalInformation(Height height, Weight weight, Address address, string description, Gender wantedGender, GeoCoordinate coordinate)
        {
            Height = height;
            Weight = weight;
            Address = address;
            Description = description;
            WantedGender = wantedGender;
            Coordinate = coordinate;
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

            LastLoginDate = DateTime.UtcNow;
        }

        public void ActivateUser()
        {
            if (!Status.Equals(UserStatus.Created) && !Status.Equals(UserStatus.Active))
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

        #region Weddings

        public void AddIncomingWedding(DateTime date, Address address, string description)
        {
            var wedding = new Wedding(_incomingWeddings.GetNextNo(), date, address, description);
            _incomingWeddings.Add(wedding);
        }

        public void UpdateIncomingWedding(int no, DateTime date, Address address, string description)
        {
            var incomingWedding = GetWeddingOrThrow(no);
            incomingWedding.Update(date, address, description);
        }

        public void RemoveIncomingWedding(int no)
        {
            var incomingWedding = GetWeddingOrThrow(no);
            incomingWedding.MarkAsArchived();
        }

        private Wedding GetWeddingOrThrow(int no)
        {
            var wedding = _incomingWeddings.SingleOrDefault(x => x.No == no);
            if (wedding == null)
            {
                throw new BusinessLogicException(UserResources.WeddingNotFoundMessage);
            }

            return wedding;
        }

        #endregion

        #region Likes

        public void AddLike(AggregateId userId)
        {
            if (!Status.Equals(UserStatus.Active))
            {
                throw new BusinessLogicException(UserResources.UserShouldBeActiveMessage);
            }

            if (_likes.Any(x => x.LikedUserId == userId && !x.IsArchived))
            {
                throw new BusinessLogicException(UserResources.UserAlreadyLikedMessage);
            }

            var like = new UserLike(_likes.GetNextNo(), userId);
            _likes.Add(like);

            DomainEvent(_userDomainEventFactory.PrepareUserLikeAddedEvent(this, like));
        }

        public void RemoveLike(int no)
        {
            if (!Status.Equals(UserStatus.Active))
            {
                throw new BusinessLogicException(UserResources.UserShouldBeActiveMessage);
            }

            var like = GetLikeOrThrow(no);
            like.MarkAsArchived();

            DomainEvent(_userDomainEventFactory.PrepareUserLikeRemovedEvent(this, like));
        }

        private UserLike GetLikeOrThrow(int no)
        {
            var like = _likes.SingleOrDefault(x => x.No == no && !x.IsArchived);
            if (like == null)
            {
                throw new BusinessLogicException(UserResources.UserLikeNotFoundMessage);
            }

            return like;
        }

        #endregion

        #region Ratings

        public void AddRating(RateType type, decimal rate)
        {
            ValidateRate(type, rate);

            var rating = new UserRating(_ratings.GetNextNo(), _correlationContext.CurrentUser.UserId.Value, rate, type);
            _ratings.Add(rating);
        }

        public void UpdateRating(int no, decimal rate)
        {
            var rating = GetRatingOrThrow(no);
            if (rating.RatedBy != _correlationContext.CurrentUser.UserId.Value)
            {
                throw new BusinessLogicException(UserResources.RatingNotFoundMessage);
            }

            rating.Update(rate);
        }

        public void RemoveRating(int no)
        {
            var rating = GetRatingOrThrow(no);
            if (rating.RatedBy != _correlationContext.CurrentUser.UserId.Value)
            {
                throw new BusinessLogicException(UserResources.RatingNotFoundMessage);
            }

            rating.MarkAsArchived();
        }

        private UserRating GetRatingOrThrow(int no)
        {
            var rating = _ratings.SingleOrDefault(x => x.No == no);
            if (rating == null)
            {
                throw new BusinessLogicException(UserResources.RatingNotFoundMessage);
            }

            return rating;
        }

        private void ValidateRate(RateType type, in decimal rate)
        {
            if (!_likes.Any(x => x.LikedUserId == _correlationContext.CurrentUser.UserId.Value && !x.IsArchived))
            {
                throw new BusinessLogicException(UserResources.LikeNeededToRateUserMessage);
            }

            if (_ratings.Any(x => !x.IsArchived && x.RatedBy == _correlationContext.CurrentUser.UserId.Value && x.Type == type))
            {
                throw new BusinessLogicException(UserResources.RateAlreadyAddedMessage);
            }
        }

        #endregion

        #region Photos

        public void AddPhoto(string name, string format, long sizeInBytes, string path)
        {
            var photo = new UserPhoto(_photos.GetNextNo(), path, name, format, sizeInBytes);
            _photos.Add(photo);
        }

        public void RemovePhoto(int no)
        {
            var photo = GetPhotoOrThrow(no);
            photo.MarkAsArchived();
        }

        private UserPhoto GetPhotoOrThrow(int no)
        {
            var photo = _photos.SingleOrDefault(x => x.No == no);
            if (photo == null)
            {
                throw new BusinessLogicException(UserResources.PhotoNotFoundMessage);
            }

            return photo;
        }

        #endregion

        private void AssignFromDataStructure(UserDataStructure userDataStructure)
        {
            SetUserName(userDataStructure.UserName);
            SetFirstName(userDataStructure.FirstName);
            SetSecondName(userDataStructure.SecondName);
            SetEmail(userDataStructure.Email);
            BirthDate = userDataStructure.BirthDate;
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
