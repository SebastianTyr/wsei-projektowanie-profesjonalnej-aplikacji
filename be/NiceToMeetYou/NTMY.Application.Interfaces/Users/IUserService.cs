using System.Threading.Tasks;
using GeoCoordinatePortable;
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
    }
}
