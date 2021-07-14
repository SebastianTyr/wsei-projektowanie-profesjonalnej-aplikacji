using System;
using PlaygroundShared.Application.CQRS;
using PlaygroundShared.Domain;

namespace NTMY.Application.Interfaces.Pairs.Queries
{
    public class GetPairMessagesQuery : IQuery
    {
        public AggregateId UserId { get; }
        public AggregateId PairId { get; }
        public DateTime? FromDate { get; }

        public GetPairMessagesQuery(AggregateId userId, AggregateId pairId, DateTime? fromDate)
        {
            UserId = userId;
            PairId = pairId;
            FromDate = fromDate;
        }
    }
}