using System;
using PlaygroundShared.Infrastructure.Persistance;

namespace NTMY.Infrastructure.Persistance.Users
{
    public class UserWeddingEntity : BaseDbEntity
    {
        public int No { get; set; }
        public bool IsArchived { get; set; }
        public DateTime Date { get; set; }
        public string AddressStreet { get; set; }
        public string AddressCity { get; set; }
        public string AddressPostCode { get; set; }
        public string AddressCountry { get; set; }
        public string Description { get; set; }
    }
}