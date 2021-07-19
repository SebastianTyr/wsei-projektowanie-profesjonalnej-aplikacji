using System;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using NTMY.Application.Interfaces.Users;
using NTMY.Application.Interfaces.Users.DTOs;
using NTMY.Domain.Users;
using NTMY.Domain.Users.DataStructures;
using NTMY.Domain.Users.Factories;
using NTMY.Domain.Users.Repositories;
using NTMY.Domain.Users.Resources;
using NTMY.SharedKernel;
using PlaygroundShared;
using PlaygroundShared.Configurations;
using PlaygroundShared.Domain;
using PlaygroundShared.Infrastructure;

namespace NTMY.Application.Users
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserFactory _userFactory;
        private readonly IJwtConfiguration _jwtConfiguration;
        private readonly ICorrelationContext _correlationContext;

        public UserService(IUserRepository userRepository, IUserFactory userFactory, IJwtConfiguration jwtConfiguration, ICorrelationContext correlationContext)
        {
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
            _userFactory = userFactory ?? throw new ArgumentNullException(nameof(userFactory));
            _jwtConfiguration = jwtConfiguration ?? throw new ArgumentNullException(nameof(jwtConfiguration));
            _correlationContext = correlationContext ?? throw new ArgumentNullException(nameof(correlationContext));
        }

        public async Task RegisterUserAsync(UserDataStructure userDataStructure, string password, string confirmPassword)
        {
            var user = await _userRepository.GetUserByEmailAsync(userDataStructure.Email);
            if (user != null)
            {
                throw new BusinessLogicException(UserResources.UserAlreadyExistsMessage);
            }

            user = _userFactory.Create(userDataStructure);
            user.SetPassword(password, confirmPassword);

            await _userRepository.PersistAsync(user);
        }

        public async Task<LoggedUserDto> LoginUserAsync(string email, string password)
        {
            var user = await GetUserOrThrowAsync(email);
            user.VerifyPassword(password);

            var token = GenerateJwtToken(user);

            return new LoggedUserDto(user.Id.Id, user.UserName, user.Email, user.FirstName, user.SecondName, token, user.Gender);
        }

        public async Task UpdateUserAsync(UserDataStructure userDataStructure)
        {
            var user = await GetUserOrThrowAsync(userDataStructure.Id);
            user.Update(userDataStructure);

            await _userRepository.PersistAsync(user);
        }

        public async Task ActivateUserAsync(AggregateId userId)
        {
            var user = await GetUserOrThrowAsync(userId);
            user.ActivateUser();

            await _userRepository.PersistAsync(user);
        }

        public async Task SetAdditionalInformationAsync(UserAdditionalInformationDataStructure dataStructure)
        {
            var user = await GetUserOrThrowAsync(_correlationContext.CurrentUser.UserId.Value);
            user.SetAdditionalInformation(dataStructure.Height, dataStructure.Weight, dataStructure.Address, dataStructure.Description, dataStructure.WantedGender, dataStructure.Coordinate);

            await _userRepository.PersistAsync(user);
        }

        public async Task AddUserLikeAsync(AggregateId likedUserId)
        {
            var user = await GetUserOrThrowAsync(_correlationContext.CurrentUser.UserId.Value);
            user.AddLike(likedUserId);

            await _userRepository.PersistAsync(user);
        }

        public async Task RemoveUserLikeAsync(int no)
        {
            var user = await GetUserOrThrowAsync(_correlationContext.CurrentUser.UserId.Value);
            user.RemoveLike(no);

            await _userRepository.PersistAsync(user);
        }

        public async Task AddPhotoAsync(IFormFile file)
        {
            var user = await GetUserOrThrowAsync(_correlationContext.CurrentUser.UserId.Value);
            var folderName = Path.Combine("Resources/", "Images/");
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

            if (file.Length <= 0)
            {
                throw new BusinessLogicException(UserResources.IncorrectPhotoSizeMessage);
            }

            var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
            var fullPath = Path.Combine(pathToSave, fileName);

            var dbPath = Path.Combine(folderName, fileName);
            await using var stream = new FileStream(fullPath, FileMode.Create);
            await file.CopyToAsync(stream);

            user.AddPhoto(fileName, "jpg", file.Length, dbPath);
            await _userRepository.PersistAsync(user);
        }

        public async Task<CurrentUserInfoDto> GetCurrentUserInfoAsync(string baseUrl)
        {
            var user = await GetUserOrThrowAsync(_correlationContext.CurrentUser.UserId.Value);
            return new CurrentUserInfoDto(
                user.Id.Id, 
                user.UserName,
                user.Email,
                user.FirstName,
                user.SecondName,
                user.Gender,
                user.WantedGender,
                user.BirthDate,
                user.Weight,
                user.Height,
                user.IsConfirmed,
                user.Description,
                user.Coordinate,
                user.Address,
                user.Photos.Select(x => new UserPhotoDto()
                {
                    FileName = x.Name,
                    FileNo = x.No,
                    FileUrl = baseUrl + "/" + x.Path,
                    Id = user.Id.Id
                }));
        }

        public async Task AddUserIncomingWeddingAsync(DateTime date, Address address, string description)
        {
            var user = await GetUserOrThrowAsync(_correlationContext.CurrentUser.UserId.Value);
            user.AddIncomingWedding(date, address, description);

            await _userRepository.PersistAsync(user);
        }

        public async Task UpdateUserIncomingWeddingAsync(int no, DateTime date, Address address, string description)
        {
            var user = await GetUserOrThrowAsync(_correlationContext.CurrentUser.UserId.Value);
            user.UpdateIncomingWedding(no, date, address, description);

            await _userRepository.PersistAsync(user);
        }

        public async Task RemoveUserIncomingWeddingAsync(int no)
        {
            var user = await GetUserOrThrowAsync(_correlationContext.CurrentUser.UserId.Value);
            user.RemoveIncomingWedding(no);

            await _userRepository.PersistAsync(user);
        }

        private async Task<User> GetUserOrThrowAsync(AggregateId id)
        {
            var user = await _userRepository.GetAsync(id);
            if (user == null)
            {
                throw new BusinessLogicException(UserResources.UserNotFoundMessage);
            }

            return user;
        }

        private async Task<User> GetUserOrThrowAsync(string email)
        {
            var user = await _userRepository.GetUserByEmailAsync(email);
            if (user == null)
            {
                throw new BusinessLogicException(UserResources.UserNotFoundMessage);
            }

            return user;
        }

        private string GenerateJwtToken(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtConfiguration.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("id", user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.UserName), 
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(_jwtConfiguration.ExpiresHours),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = jwtTokenHandler.WriteToken(token);

            return jwtToken;
        }
    }
}
