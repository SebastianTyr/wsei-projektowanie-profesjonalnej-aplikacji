﻿using System.Collections.Generic;
using System.Threading.Tasks;
using NTMY.Application.Interfaces.Users.DTOs;
using NTMY.Application.Interfaces.Users.Queries;

namespace NTMY.Application.Interfaces.Users.ReadModels
{
    public interface IUsersReadModel : IReadModel
    {
        Task<IEnumerable<UserDto>> GetUsersAsync(GetUsersQuery query);
        Task<IEnumerable<UserWeddingDto>> GetIncomingWeddingsAsync(GetIncomingWeddingsQuery query);
        Task<UserDto> GetUserInfoAsync(GetUserQuery query);
    }
}
