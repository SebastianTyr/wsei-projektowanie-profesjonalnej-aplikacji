using System;
using System.Collections.Generic;
using System.Linq;
using NTMY.Domain.Pairs.DataStructures;
using NTMY.Domain.Pairs.Resources;
using NTMY.SharedKernel;
using PlaygroundShared.Domain;
using PlaygroundShared.DomainEvents;
using PlaygroundShared.Infrastructure;

namespace NTMY.Domain.Pairs
{
    public class Pair : BaseAggregateRoot
    {
        private ICorrelationContext _correlationContext;
        public AggregateId FirstUserId { get; private set; }
        public AggregateId SecondUserId { get; private set; }
        public DateTime PairDate { get; private set; }
        public PairStatus Status { get; private set; }
        public AggregateId? CancelledBy { get; private set; }
        public AggregateId? CompletedBy { get; private set; }

        private List<PairMessage> _messages = new List<PairMessage>();
        public IEnumerable<PairMessage> Messages
        {
            get => _messages;
            private set => _messages = value.ToList();
        }


        public Pair(AggregateId id, IDomainEventsManager domainEventsManager, ICorrelationContext correlationContext, PairDataStructure dataStructure) : base(id, domainEventsManager)
        {
            SetDependencies(domainEventsManager);
            AssignFromDataStructure(dataStructure);
            PairDate = DateTime.UtcNow;
            Status = PairStatus.Matched;
        }

        private Pair()
        {

        }

        public void SetDependencies(IDomainEventsManager domainEventsManager, ICorrelationContext correlationContext)
        {
            base.SetDependencies(domainEventsManager);
            _correlationContext = correlationContext ?? throw new ArgumentNullException(nameof(correlationContext));
        }

        public void Complete()
        {
            if (!Status.Equals(PairStatus.Matched))
            {
                throw new BusinessLogicException(PairResources.PairShouldBeMatchedMessage);
            }

            Status = PairStatus.Completed;
            CompletedBy = _correlationContext.CurrentUser.UserId;
        }

        public void Cancel()
        {
            foreach (var pairMessage in _messages)
            {
                pairMessage.MarkAsArchived();
            }

            Status = PairStatus.Cancelled;
            CancelledBy = _correlationContext.CurrentUser.UserId;
        }

        public int AddMessage(AggregateId toUserId, string message)
        {
            ValidateAddingMessage(toUserId);

            var pairMessage = new PairMessage(_messages.GetNextNo(), _correlationContext.CurrentUser.UserId.Value, toUserId, message);
            _messages.Add(pairMessage);
            return pairMessage.No;
        }

        public void RemoveMessage(int no)
        {
            var pairMessage = GetPairMessageOrThrow(no);
            pairMessage.MarkAsArchived();
        }

        private PairMessage GetPairMessageOrThrow(int no)
        {
            var message = _messages.SingleOrDefault(x => x.No == no);
            if (message == null)
            {
                throw new BusinessLogicException(PairResources.PairMessageNotFoundMessage);
            }

            return message;
        }

        private void ValidateAddingMessage(AggregateId toUserId)
        {
            ValidateUserRightsToMessage();

            if (FirstUserId != toUserId && SecondUserId != toUserId)
            {
                throw new BusinessLogicException(PairResources.IncorrectUserMessage);
            }
        }

        private void ValidateUserRightsToMessage()
        {
            if (Status.Equals(PairStatus.Cancelled))
            {
                throw new BusinessLogicException(PairResources.PairCannotBeCancelledMessage);
            }

            if (FirstUserId != _correlationContext.CurrentUser.UserId && SecondUserId != _correlationContext.CurrentUser.UserId)
            {
                throw new BusinessLogicException(PairResources.IncorrectUserMessage);
            }
        }

        private void AssignFromDataStructure(PairDataStructure dataStructure)
        {
            if (dataStructure.FirstUserId == dataStructure.SecondUserId)
            {
                throw new BusinessLogicException(PairResources.IncorrectUserMessage);
            }

            FirstUserId = dataStructure.FirstUserId;
            SecondUserId = dataStructure.SecondUserId;
        }
    }
}
