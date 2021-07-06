using PlaygroundShared.Application.CQRS;
using PlaygroundShared.Domain;

namespace NTMY.Application.Interfaces.Pairs.Commands
{
    public class AddMessageToPairCommand : ICommand
    {
        public AggregateId PairId { get; }
        public AggregateId ToUserId { get; }
        public string Message { get; }

        public AddMessageToPairCommand(AggregateId pairId, AggregateId toUserId, string message)
        {
            PairId = pairId;
            ToUserId = toUserId;
            Message = message;
        }
    }
}