using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace NTMY.SharedKernel
{
    public static class DomainExtensions
    {
        public static int GetNextNo<TDomainEntity>(this IList<TDomainEntity> domainEntities) where TDomainEntity : IDomainEntity
            => domainEntities.Any() ? domainEntities.Max(x => x.No) + 1 : 1;
    }
}
