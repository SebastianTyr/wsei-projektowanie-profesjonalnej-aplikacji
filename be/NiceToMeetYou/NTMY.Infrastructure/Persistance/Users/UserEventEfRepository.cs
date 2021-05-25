using PlaygroundShared.Infrastructure.EF.EventDbContext;
using PlaygroundShared.Infrastructure.Repositories;

namespace NTMY.Infrastructure.Persistance.Users
{
    public class UserEventEfRepository : GenericEfEventRepository<UserEventEntity>
    {
        public UserEventEfRepository(EventDbContext dbContext) : base(dbContext)
        {
        }
    }
}