using System;
using NTMY.Domain.Pairs.DataStructures;
using PlaygroundShared.Domain;
using PlaygroundShared.DomainEvents;
using PlaygroundShared.Infrastructure;

namespace NTMY.Domain.Pairs.Factories
{
    public class PairFactory : IPairFactory
    {
        private readonly IDomainEventsManager _domainEventsManager;
        private readonly ICorrelationContext _correlationContext;

        public PairFactory(IDomainEventsManager domainEventsManager, ICorrelationContext correlationContext)
        {
            _domainEventsManager = domainEventsManager ?? throw new ArgumentNullException(nameof(domainEventsManager));
            _correlationContext = correlationContext ?? throw new ArgumentNullException(nameof(correlationContext));
        }

        public void Init(Pair aggregate)
        {
            aggregate.SetDependencies(_domainEventsManager, _correlationContext);
        }

        public Pair Create(AggregateId id, PairDataStructure dataStructure)
            => new Pair(id, _domainEventsManager, _correlationContext, dataStructure);
    }
}
