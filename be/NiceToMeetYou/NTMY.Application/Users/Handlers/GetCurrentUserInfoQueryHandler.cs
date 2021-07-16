using System;
using System.Threading.Tasks;
using NTMY.Application.Interfaces.Users;
using NTMY.Application.Interfaces.Users.DTOs;
using NTMY.Application.Interfaces.Users.Queries;
using PlaygroundShared.Application.CQRS;

namespace NTMY.Application.Users.Handlers
{
    public class GetCurrentUserInfoQueryHandler : IQueryHandler<GetCurrentUserInfoQuery, CurrentUserInfoDto>
    {
        private readonly IUserService _userService;

        public GetCurrentUserInfoQueryHandler(IUserService userService)
        {
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
        }

        public async Task<CurrentUserInfoDto> HandleAsync(GetCurrentUserInfoQuery query) => await _userService.GetCurrentUserInfoAsync(query.BaseUrl);
    }
}