using System;
using System.Threading.Tasks;
using NTMY.Application.Interfaces;
using NTMY.Application.Interfaces.Users.DTOs;
using NTMY.Application.Interfaces.Users.Queries;
using NTMY.Application.Interfaces.Users.ReadModels;
using PlaygroundShared.Application.CQRS;

namespace NTMY.Application.Users.Handlers
{
    public class GetUsersQueryHandler : IQueryHandler<GetUsersQuery, ListDto<UserDto>>
    {
        private readonly IUsersReadModel _readModel;

        public GetUsersQueryHandler(IUsersReadModel readModel)
        {
            _readModel = readModel ?? throw new ArgumentNullException(nameof(readModel));
        }

        public async Task<ListDto<UserDto>> HandleAsync(GetUsersQuery query)
            => new ListDto<UserDto>(await  _readModel.GetUsersAsync(query));
    }
}