using System;
using System.Threading.Tasks;
using NTMY.Application.Interfaces.Users.DTOs;
using NTMY.Application.Interfaces.Users.Queries;
using NTMY.Application.Interfaces.Users.ReadModels;
using PlaygroundShared.Application.CQRS;

namespace NTMY.Application.Users.Handlers
{
    public class GetUserQueryHandler : IQueryHandler<GetUserQuery, UserDto>
    {
        private readonly IUsersReadModel _readModel;

        public GetUserQueryHandler(IUsersReadModel readModel)
        {
            _readModel = readModel ?? throw new ArgumentNullException(nameof(readModel));
        }

        public async Task<UserDto> HandleAsync(GetUserQuery query)
            => await  _readModel.GetUserInfoAsync(query);
    }
}