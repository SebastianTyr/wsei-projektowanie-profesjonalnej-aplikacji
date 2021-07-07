using System.Threading.Tasks;
using AutoMapper;
using NTMY.Domain.Pairs;
using NTMY.Domain.Pairs.Repositories;
using PlaygroundShared.Domain;
using PlaygroundShared.DomainEvents;
using PlaygroundShared.Infrastructure.Repositories;

namespace NTMY.Infrastructure.Persistance.Pairs
{
    public class PairRepository : BaseAggregateRootRepository<Pair, PairEntity, PairEventEntity>, IPairRepository
    {
        public PairRepository(IGenericRepository<PairEntity> repository, IGenericEventRepository<PairEventEntity> eventRepository, IDomainEventsManager domainEventsManager, IMapper mapper, IAggregateRecreate<Pair> aggregateRecreate) : base(repository, eventRepository, domainEventsManager, mapper, aggregateRecreate)
        {
        }

        public async Task<Pair> GetPairForUsersAsync(AggregateId firstUserId, AggregateId secondUserId) 
            => MapToAggregate(await Repository.GetByExpressionAsync(x => 
                (x.FirstUserId == firstUserId.Id && x.SecondUserId == secondUserId.Id) ||
                (x.SecondUserId == firstUserId.Id && x.FirstUserId == secondUserId.Id)));
    }
}