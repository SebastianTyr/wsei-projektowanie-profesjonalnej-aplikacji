using System;
using PlaygroundShared.Infrastructure.Persistance;

namespace NTMY.Infrastructure.Persistance.Pairs
{
    public class PairMessageEntity : BaseDbEntity
    {
        public int No { get; set; }
        public bool IsArchived { get; set; }
        public Guid FromUserId { get; set; }
        public Guid ToUserId { get; set; }
        public DateTime SentDate { get; set; }
        public string Message { get; set; }
    }
}