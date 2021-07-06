using NTMY.Domain.Pairs.DataStructures;
using PlaygroundShared.Domain;

namespace NTMY.Domain.Pairs.Factories
{
    public interface IPairFactory : IDomainFactory, IAggregateRecreate<Pair>
    {
        Pair Create(AggregateId id, PairDataStructure dataStructure);
    }
}