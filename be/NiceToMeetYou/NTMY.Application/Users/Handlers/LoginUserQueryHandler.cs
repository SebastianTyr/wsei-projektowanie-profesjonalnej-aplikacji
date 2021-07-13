using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NTMY.Application.Interfaces.Users;
using NTMY.Application.Interfaces.Users.DTOs;
using NTMY.Application.Interfaces.Users.Queries;
using PlaygroundShared.Application.CQRS;

namespace NTMY.Application.Users.Handlers
{
    public class LoginUserQueryHandler : IQueryHandler<LoginUserQuery, LoggedUserDto>
    {
        private readonly IUserService _userService;

        public LoginUserQueryHandler(IUserService userService)
        {
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
        }

        public async Task<LoggedUserDto> HandleAsync(LoginUserQuery query) => await _userService.LoginUserAsync(query.Email, query.Password);
    }
}