using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NTMY.Application.Interfaces.Pairs.Commands;
using NTMY.Web.ViewModels.Pairs;
using PlaygroundShared.Application.CQRS;
using PlaygroundShared.Domain;

namespace NTMY.Web.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class PairsController : ControllerBase
    {
        private readonly ICommandQueryDispatcherDecorator _commandQueryDispatcherDecorator;
        private readonly IMapper _mapper;

        public PairsController(ICommandQueryDispatcherDecorator commandQueryDispatcherDecorator, IMapper mapper)
        {
            _commandQueryDispatcherDecorator = commandQueryDispatcherDecorator ?? throw new ArgumentNullException(nameof(commandQueryDispatcherDecorator));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        [HttpPost("messages")]
        public async Task<IActionResult> SendMessageAsync([FromBody] AddMessageToPairViewModel viewModel)
        {
            var command = new AddMessageToPairCommand(new AggregateId(viewModel.PairId), new AggregateId(viewModel.ToUserId), viewModel.Message);
            await _commandQueryDispatcherDecorator.DispatchAsync(command);

            return Ok();
        }
        
    }
}
