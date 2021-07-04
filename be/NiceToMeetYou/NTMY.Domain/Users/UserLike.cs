using System;
using NTMY.SharedKernel;
using PlaygroundShared.Domain;

namespace NTMY.Domain.Users
{
    public class UserLike : IDomainEntity
    {
        public int No { get; private set; }
        public bool IsArchived { get; private set; }
        public AggregateId LikedUserId { get; private set; }
        public DateTime Date { get; private set; }


        public UserLike(int no, AggregateId likedUserId)
        {
            No = no;
            LikedUserId = likedUserId;
            Date = DateTime.UtcNow;
        }

        private UserLike()
        {

        }

        public void MarkAsArchived()
        {
            IsArchived = true;
        }
    }
}