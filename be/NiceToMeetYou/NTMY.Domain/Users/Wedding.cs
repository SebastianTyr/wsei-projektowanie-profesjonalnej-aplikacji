using System;
using NTMY.Domain.Users.Resources;
using NTMY.SharedKernel;

namespace NTMY.Domain.Users
{
    public class Wedding : IDomainEntity
    {
        public int No { get; private set; }
        public bool IsArchived { get; private set; }

        public DateTime Date { get; private set; }
        public Address Address { get; private set; }
        public string Description { get; private set; }

        public Wedding(int no, DateTime date, Address address, string description)
        {
            No = no;
            SetDate(date);
            Address = address;
            Description = description;
        }

        private Wedding()
        {

        }

        public void Update(DateTime date, Address address, string description)
        {
            SetDate(date);
            Address = address;
            Description = description;
        }

        public void MarkAsArchived()
        {
            IsArchived = true;
        }

        private void SetDate(DateTime date)
        {
            if (date <= DateTime.UtcNow)
            {
                throw new BusinessLogicException(UserResources.IncorrectWeddingDateMessage);
            }

            Date = date;
        }
    }
}