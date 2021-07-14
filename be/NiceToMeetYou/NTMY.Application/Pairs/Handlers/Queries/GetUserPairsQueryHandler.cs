using System;
using System.Threading.Tasks;
using NTMY.Application.Interfaces;
using NTMY.Application.Interfaces.Pairs.DTOs;
using NTMY.Application.Interfaces.Pairs.Queries;
using NTMY.Application.Interfaces.Pairs.ReadModels;
using PlaygroundShared.Application.CQRS;

namespace NTMY.Application.Pairs.Handlers.Queries
{
    public class GetUserPairsQueryHandler : IQueryHandler<GetUserPairsQuery, ListDto<PairInfoDto>>
    {
        private readonly IPairsReadModel _pairsReadModel;

        public GetUserPairsQueryHandler(IPairsReadModel pairsReadModel)
        {
            _pairsReadModel = pairsReadModel ?? throw new ArgumentNullException(nameof(pairsReadModel));
        }

        public async Task<ListDto<PairInfoDto>> HandleAsync(GetUserPairsQuery query) => new ListDto<PairInfoDto>(await _pairsReadModel.GetUserPairsAsync(query));
    }
}
