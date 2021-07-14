using PlaygroundShared.Application.CQRS;
using PlaygroundShared.Domain;

namespace NTMY.Application.Interfaces.Pairs.Queries
{
    public class GetUserPairsQuery : IQuery
    {
        public GetUserPairsQuery(AggregateId userId)
        {
            UserId = userId;
        }

        public AggregateId UserId { get; }
    }
}
