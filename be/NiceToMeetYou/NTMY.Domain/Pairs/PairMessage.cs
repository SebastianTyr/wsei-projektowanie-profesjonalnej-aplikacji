using System;
using NTMY.Domain.Pairs.Resources;
using NTMY.SharedKernel;
using PlaygroundShared.Domain;

namespace NTMY.Domain.Pairs
{
    public class PairMessage : IDomainEntity
    {
        public int No { get; private set; }
        public bool IsArchived { get; private set; }
        public AggregateId FromUserId { get; private set; }
        public AggregateId ToUserId { get; private set; }
        public DateTime SentDate { get; private set; }
        public string Message { get; private set; }

        public PairMessage(int no, AggregateId fromUserId, AggregateId toUserId, string message)
        {
            No = no;
            FromUserId = fromUserId;
            ToUserId = toUserId;
            SentDate = DateTime.UtcNow;
            SetMessage(message);
        }

        private PairMessage() 
        {

        }

        public void MarkAsArchived()
        {
            IsArchived = true;
        }

        public void SetMessage(string message)
        {
            if (string.IsNullOrWhiteSpace(message))
            {
                throw new BusinessLogicException(PairResources.PairMessageCannotBeEmptyMessage);
            }

            Message = message;
        }
    }
}