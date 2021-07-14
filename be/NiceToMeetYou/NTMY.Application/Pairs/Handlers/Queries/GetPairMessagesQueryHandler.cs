using System;
using System.Threading.Tasks;
using NTMY.Application.Interfaces;
using NTMY.Application.Interfaces.Pairs.DTOs;
using NTMY.Application.Interfaces.Pairs.Queries;
using NTMY.Application.Interfaces.Pairs.ReadModels;
using PlaygroundShared.Application.CQRS;

namespace NTMY.Application.Pairs.Handlers.Queries
{
    public class GetPairMessagesQueryHandler : IQueryHandler<GetPairMessagesQuery, ListDto<PairMessageDto>>
    {
        private readonly IPairsReadModel _pairsReadModel;

        public GetPairMessagesQueryHandler(IPairsReadModel pairsReadModel)
        {
            _pairsReadModel = pairsReadModel ?? throw new ArgumentNullException(nameof(pairsReadModel));
        }

        public async Task<ListDto<PairMessageDto>> HandleAsync(GetPairMessagesQuery query) => new ListDto<PairMessageDto>(await _pairsReadModel.GetPairMessagesAsync(query));
    }
}