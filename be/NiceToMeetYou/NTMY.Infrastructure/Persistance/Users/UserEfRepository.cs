using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PlaygroundShared.Infrastructure.Repositories;

namespace NTMY.Infrastructure.Persistance.Users
{
    public class UserEfRepository : GenericEfRepository<UserEntity>
    {
        private readonly DbContext _context;
        protected override IQueryable<UserEntity> Query => base.Set.AsNoTracking().Include(x => x.Likes);

        public UserEfRepository(DbContext context) : base(context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        protected override void UpdateExistingEntity(UserEntity existingEntity, UserEntity entity)
        {
            base.UpdateExistingEntity(existingEntity, entity);

            foreach (var userLikeEntity in entity.Likes)
            {
                var likeEntry = _context.Entry(userLikeEntity);
                likeEntry.State = existingEntity.Likes.Any(x => x.Id == userLikeEntity.Id && x.No == userLikeEntity.No) ? EntityState.Modified : EntityState.Added;
            }
        }
    }
}
