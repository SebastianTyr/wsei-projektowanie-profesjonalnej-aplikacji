using System;
using System.Threading.Tasks;
using AutoMapper;
using GeoCoordinatePortable;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NTMY.Application.Interfaces;
using NTMY.Application.Interfaces.Users.Commands;
using NTMY.Application.Interfaces.Users.DTOs;
using NTMY.Application.Interfaces.Users.Queries;
using NTMY.Domain.Users;
using NTMY.Web.ViewModels.Users;
using PlaygroundShared.Application.CQRS;
using PlaygroundShared.Domain;

namespace NTMY.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ICommandQueryDispatcherDecorator _commandQueryDispatcherDecorator;
        private readonly IMapper _mapper;

        public UsersController(ICommandQueryDispatcherDecorator commandQueryDispatcherDecorator, IMapper mapper)
        {
            _commandQueryDispatcherDecorator = commandQueryDispatcherDecorator ?? throw new ArgumentNullException(nameof(commandQueryDispatcherDecorator));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterUserViewModel viewModel)
        {
            var command = new RegisterUserCommand(
                viewModel.UserName,
                viewModel.FirstName,
                viewModel.SecondName,
                viewModel.Email,
                viewModel.Gender,
                viewModel.BirthDate,
                viewModel.Password,
                viewModel.ConfirmPassword);

            await _commandQueryDispatcherDecorator.DispatchAsync(command);

            return Ok();
        }

        [HttpPost("signIn")]
        public async Task<IActionResult> SignIn([FromBody] SignInViewModel viewModel)
        {
            var query = new LoginUserQuery(viewModel.Email, viewModel.Password);
            var result = await _commandQueryDispatcherDecorator.DispatchAsync<LoginUserQuery, LoggedUserDto>(query);

            return Ok(_mapper.Map<LoggedUserViewModel>(result));
        }

        [HttpPost("Active")]
        public async Task<IActionResult> Activate([FromBody] ActivateUserViewModel viewModel)
        {
            var command = new ActivateUserCommand(new AggregateId(viewModel.Id));
            await _commandQueryDispatcherDecorator.DispatchAsync(command);

            return Ok();
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("AddLike")]
        public async Task<IActionResult> AddLike([FromBody] AddUserLikeViewModel viewModel)
        {
            var command = new AddUserLikeCommand(new AggregateId(viewModel.LikedUserId));
            await _commandQueryDispatcherDecorator.DispatchAsync(command);

            return Ok();
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpDelete("RemoveLike")]
        public async Task<IActionResult> AddLike([FromBody] RemoveUserLikeViewModel viewModel)
        {
            var command = new RemoveUserLikeCommand(viewModel.LikedNo);
            await _commandQueryDispatcherDecorator.DispatchAsync(command);

            return Ok();
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut("SetAdditionalInformation")]
        public async Task<IActionResult> SetAdditionalInformation([FromBody] SetUserAdditionalInformationViewModel viewModel) 
        {
            var command = new SetUserAdditionalInformationCommand(
                new Height(viewModel.Height.Value, viewModel.Height.Unit),
                new Weight(viewModel.Weight.Value, viewModel.Weight.Unit),
                new Address(viewModel.Address.Street, viewModel.Address.City, viewModel.Address.PostCode, viewModel.Address.Country), 
                viewModel.Description,
                (Gender)viewModel.WantedGender,
                new GeoCoordinate(viewModel.Coordinate.Latitude, viewModel.Coordinate.Longitude));
            await _commandQueryDispatcherDecorator.DispatchAsync(command);

            return Ok();
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("Browse")]
        public async Task<IActionResult> Browse(int maxDistance, int? maxAge, [FromQuery(Name = "genders")] Gender[] genders)
        {
            var baseUrl = $"{Request.Scheme}://{Request.Host}{Request.PathBase}";
            var query = new GetUsersQuery(maxDistance, maxAge, genders, baseUrl);

            return Ok(await _commandQueryDispatcherDecorator.DispatchAsync<GetUsersQuery, ListDto<UserDto>>(query));
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("UploadPhoto"), DisableRequestSizeLimit]
        public async Task<IActionResult> UploadPhotoAsync(IFormFile file)
        {
            var command = new UploadUserPhotoCommand(file);
            await _commandQueryDispatcherDecorator.DispatchAsync(command);

            return Ok();
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("GetCurrentUserInfo")]
        public async Task<IActionResult> GetCurrentUserInfo()
        {
            var baseUrl = $"{Request.Scheme}://{Request.Host}{Request.PathBase}";
            var query = new GetCurrentUserInfoQuery(baseUrl);
            var result = await _commandQueryDispatcherDecorator
                .DispatchAsync<GetCurrentUserInfoQuery, CurrentUserInfoDto>(query);

            return Ok(_mapper.Map<CurrentUserViewModel>(result));
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("AddIncomingWeddingToUser")]
        public async Task<IActionResult> AddIncomingWeddingToUser([FromBody] AddIncomingWeddingToUserViewModel viewModel)
        {
            var command = new AddIncomingWeddingToUserCommand(
                viewModel.Date,
                new Address(viewModel.Address.Street, viewModel.Address.City, viewModel.Address.PostCode, viewModel.Address.Country),
                viewModel.Description);

            await _commandQueryDispatcherDecorator.DispatchAsync(command);
            return Ok();
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPut("UpdateUserIncomingWedding")]
        public async Task<IActionResult> UpdateUserIncomingWedding([FromBody] UpdateUserIncomingWeddingViewModel viewModel)
        {
            var command = new UpdateUserIncomingWeddingCommand(
                viewModel.No,
                viewModel.Date,
                new Address(viewModel.Address.Street, viewModel.Address.City, viewModel.Address.PostCode, viewModel.Address.Country),
                viewModel.Description);

            await _commandQueryDispatcherDecorator.DispatchAsync(command);
            return Ok();
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpDelete("RemoveUserIncomingWedding")]
        public async Task<IActionResult> RemoveUserIncomingWedding([FromBody] RemoveUserIncomingWeddingViewModel viewModel)
        {
            var command = new RemoveUserIncomingWeddingCommand(viewModel.No);

            await _commandQueryDispatcherDecorator.DispatchAsync(command);
            return Ok();
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("GetIncomingWeddings")]
        public async Task<IActionResult> GetIncomingWeddings(int maxDistance, int? maxAge, [FromQuery(Name = "genders")] Gender[] genders)
        {
            var query = new GetIncomingWeddingsQuery(maxDistance, maxAge, genders);
            
            var result = await _commandQueryDispatcherDecorator.DispatchAsync<GetIncomingWeddingsQuery, ListDto<UserWeddingDto>>(query);
            return Ok(result);
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var baseUrl = $"{Request.Scheme}://{Request.Host}{Request.PathBase}";
            var query = new GetUserQuery(id, baseUrl);

            return Ok(await _commandQueryDispatcherDecorator.DispatchAsync<GetUserQuery, UserDto>(query));
        }
    }
}