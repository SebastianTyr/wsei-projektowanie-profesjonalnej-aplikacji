using System.Collections.Generic;
using System.Threading.Tasks;
using NTMY.Application.Interfaces.Pairs.DTOs;
using NTMY.Application.Interfaces.Pairs.Queries;

namespace NTMY.Application.Interfaces.Pairs.ReadModels
{
    public interface IPairsReadModel : IReadModel
    {
        Task<IEnumerable<PairInfoDto>> GetUserPairsAsync(GetUserPairsQuery query);
        Task<IEnumerable<PairMessageDto>> GetPairMessagesAsync(GetPairMessagesQuery query);
    }
}
