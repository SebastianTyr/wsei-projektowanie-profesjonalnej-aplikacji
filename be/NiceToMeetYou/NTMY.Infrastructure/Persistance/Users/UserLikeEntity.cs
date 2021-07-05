using System;
using PlaygroundShared.Infrastructure.Persistance;

namespace NTMY.Infrastructure.Persistance.Users
{
    public class UserLikeEntity : BaseDbEntity
    {
        public int No { get; set; }
        public bool IsArchived { get; set; }
        public Guid LikedUserId { get; set; }
        public DateTime Date { get; set; }
    }
}