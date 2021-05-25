using Microsoft.EntityFrameworkCore;
using PlaygroundShared.Infrastructure.Repositories;

namespace NTMY.Infrastructure.Persistance.Users
{
    public class UserEfRepository : GenericEfRepository<UserEntity>
    {
        public UserEfRepository(DbContext context) : base(context)
        {
        }
    }
}
