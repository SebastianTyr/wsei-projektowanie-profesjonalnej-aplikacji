using NTMY.SharedKernel;
using PlaygroundShared.Domain;

namespace NTMY.Domain.Users
{
    public class UserRating : IDomainEntity
    {
        public int No { get; private set; }
        public AggregateId RatedBy { get; private set; }
        public decimal Rate { get; private set; }
        public RateType Type { get; private set; }
        public bool IsArchived { get; private set; }

        public UserRating(int no, AggregateId ratedBy, decimal rate, RateType type)
        {
            No = no;
            RatedBy = ratedBy;
            Rate = rate;
            Type = type;
        }

        public void Update(decimal rate)
        {
            Rate = rate;
        }

        public void MarkAsArchived()
        {
            IsArchived = true;
        }
    }
}