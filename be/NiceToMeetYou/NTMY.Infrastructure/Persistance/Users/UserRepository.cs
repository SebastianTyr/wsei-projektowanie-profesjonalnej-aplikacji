using System.Threading.Tasks;
using AutoMapper;
using NTMY.Domain.Users;
using NTMY.Domain.Users.Repositories;
using PlaygroundShared.Domain;
using PlaygroundShared.DomainEvents;
using PlaygroundShared.Infrastructure.Repositories;

namespace NTMY.Infrastructure.Persistance.Users
{
    public class UserRepository : BaseAggregateRootRepository<User, UserEntity, UserEventEntity>, IUserRepository
    {
        public UserRepository(IGenericRepository<UserEntity> repository, IGenericEventRepository<UserEventEntity> eventRepository, IDomainEventsManager domainEventsManager, IMapper mapper, IAggregateRecreate<User> aggregateRecreate) : base(repository, eventRepository, domainEventsManager, mapper, aggregateRecreate)
        {
        }

        public async Task<User> GetUserByEmailAsync(string email) => MapToAggregate(await Repository.GetByExpressionAsync(x => x.Email == email));
    }
}
