using System;
using System.Threading.Tasks;
using NTMY.Application.Interfaces;
using NTMY.Application.Interfaces.Users.DTOs;
using NTMY.Application.Interfaces.Users.Queries;
using NTMY.Application.Interfaces.Users.ReadModels;
using PlaygroundShared.Application.CQRS;

namespace NTMY.Application.Users.Handlers
{
    public class GetWeddingsQueryHandler : IQueryHandler<GetIncomingWeddingsQuery, ListDto<UserWeddingDto>>
    {
        private readonly IUsersReadModel _readModel;

        public GetWeddingsQueryHandler(IUsersReadModel readModel)
        {
            _readModel = readModel ?? throw new ArgumentNullException(nameof(readModel));
        }

        public async Task<ListDto<UserWeddingDto>> HandleAsync(GetIncomingWeddingsQuery query)
            => new ListDto<UserWeddingDto>(await _readModel.GetIncomingWeddingsAsync(query));
    }
}