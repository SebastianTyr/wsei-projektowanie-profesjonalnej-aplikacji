﻿using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using NTMY.Application.Interfaces.Users.Commands;
using NTMY.Application.Interfaces.Users.DTOs;
using NTMY.Application.Interfaces.Users.Queries;
using NTMY.Domain.Users;
using NTMY.Web.ViewModels.Users;
using PlaygroundShared.Application.CQRS;

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
                new Weight(viewModel.Weight.Value, viewModel.Weight.Unit),
                new Height(viewModel.Height.Value, viewModel.Height.Unit),
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
    }
}