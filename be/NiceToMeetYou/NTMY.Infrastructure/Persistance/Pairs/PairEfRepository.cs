using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using PlaygroundShared.Infrastructure.Repositories;

namespace NTMY.Infrastructure.Persistance.Pairs
{
    public class PairEfRepository : GenericEfRepository<PairEntity>
    {
        private readonly DbContext _context;
        protected override IQueryable<PairEntity> Query => base.Set.AsNoTracking().Include(x => x.Messages);

        public PairEfRepository(DbContext context) : base(context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        protected override void UpdateExistingEntity(PairEntity existingEntity, PairEntity entity)
        {
            base.UpdateExistingEntity(existingEntity, entity);

            foreach (var userLikeEntity in entity.Messages)
            {
                var likeEntry = _context.Entry(userLikeEntity);
                likeEntry.State = existingEntity.Messages.Any(x => x.Id == userLikeEntity.Id && x.No == userLikeEntity.No) ? EntityState.Modified : EntityState.Added;
            }
        }
    }
}
