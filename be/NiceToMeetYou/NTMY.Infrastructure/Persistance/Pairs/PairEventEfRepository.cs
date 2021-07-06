using PlaygroundShared.Infrastructure.EF.EventDbContext;
using PlaygroundShared.Infrastructure.Repositories;

namespace NTMY.Infrastructure.Persistance.Pairs
{
    public class PairEventEfRepository : GenericEfEventRepository<PairEventEntity>
    {
        public PairEventEfRepository(EventDbContext dbContext) : base(dbContext)
        {
        }
    }
}