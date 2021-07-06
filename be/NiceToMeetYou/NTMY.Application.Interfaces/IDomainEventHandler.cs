using System.Threading.Tasks;
using PlaygroundShared.DomainEvents;

namespace NTMY.Application.Interfaces
{
    public interface IDomainEventHandler<in TDomainEvent>
    {
        Task HandleAsync(TDomainEvent @event);
    }
}
