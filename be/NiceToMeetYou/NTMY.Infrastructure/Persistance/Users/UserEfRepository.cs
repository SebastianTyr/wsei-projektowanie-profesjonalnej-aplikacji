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
        protected override IQueryable<UserEntity> Query => base.Set.AsNoTracking()
            .Include(x => x.Likes)
            .Include(x => x.Photos)
            .Include(x => x.Weddings);

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
            foreach (var userPhotoEntity in entity.Photos)
            {
                var photoEntry = _context.Entry(userPhotoEntity);
                photoEntry.State = existingEntity.Photos.Any(x => x.Id == userPhotoEntity.Id && x.No == userPhotoEntity.No) ? EntityState.Modified : EntityState.Added;
            }
            foreach (var userWeddingEntity in entity.Weddings)
            {
                var weddingEntry = _context.Entry(userWeddingEntity);
                weddingEntry.State = existingEntity.Weddings.Any(x => x.Id == userWeddingEntity.Id && x.No == userWeddingEntity.No) ? EntityState.Modified : EntityState.Added;
            }
        }
    }
}
