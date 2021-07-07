using System;
using System.Collections.Generic;
using System.Text;
using PlaygroundShared.Domain;

namespace NTMY.Domain.Pairs.DataStructures
{
    public class PairDataStructure
    {
        public AggregateId FirstUserId { get; }
        public AggregateId SecondUserId { get; }

        public PairDataStructure(AggregateId firstUserId, AggregateId secondUserId)
        {
            FirstUserId = firstUserId;
            SecondUserId = secondUserId;
        }
    }
}
