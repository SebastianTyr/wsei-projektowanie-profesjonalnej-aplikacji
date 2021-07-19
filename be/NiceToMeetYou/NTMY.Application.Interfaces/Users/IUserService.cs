using System;
using System.IO;
using System.Threading.Tasks;
using GeoCoordinatePortable;
using Microsoft.AspNetCore.Http;
using NTMY.Application.Interfaces.Users.DTOs;
using NTMY.Domain.Users;
using NTMY.Domain.Users.DataStructures;
using PlaygroundShared.Application.Services;
using PlaygroundShared.Domain;

namespace NTMY.Application.Interfaces.Users
{
    public interface IUserService : IService
    {
        Task RegisterUserAsync(UserDataStructure userDataStructure, string password, string confirmPassword);
        Task<LoggedUserDto> LoginUserAsync(string email, string password);
        Task UpdateUserAsync(UserDataStructure userDataStructure);
        Task ActivateUserAsync(AggregateId userId);
        Task SetAdditionalInformationAsync(UserAdditionalInformationDataStructure dataStructure);
        Task AddUserLikeAsync(AggregateId likedUserId);
        Task RemoveUserLikeAsync(int no);
        Task AddPhotoAsync(IFormFile fileStream);
        Task<CurrentUserInfoDto> GetCurrentUserInfoAsync(string baseUrl);
        Task AddUserIncomingWeddingAsync(DateTime date, Address address, string description);
        Task UpdateUserIncomingWeddingAsync(int no, DateTime date, Address address, string description);
        Task RemoveUserIncomingWeddingAsync(int no);
    }
}
