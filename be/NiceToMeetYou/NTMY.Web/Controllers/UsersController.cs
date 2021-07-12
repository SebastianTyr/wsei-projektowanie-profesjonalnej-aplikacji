using System;
using System.Threading.Tasks;
using AutoMapper;
using GeoCoordinatePortable;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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

    }
}