using System;
using System.Collections.Generic;
using NTMY.Domain.Pairs;
using NTMY.Infrastructure.Persistance.Users;
using PlaygroundShared.Infrastructure.Persistance;

namespace NTMY.Infrastructure.Persistance.Pairs
{
    public class PairEntity : BaseAggregateDbEntity
    {
        public Guid FirstUserId { get; set; }
        public UserEntity FirstUser { get; set; }
        public Guid SecondUserId { get; set; }
        public UserEntity SecondUser { get; set; }
        public DateTime PairDate { get; set; }
        public PairStatus Status { get; set; }
        public Guid? CancelledBy { get; set; }
        public Guid? CompletedBy { get; set; }
        public List<PairMessageEntity> Messages { get; set; }
    }
}
