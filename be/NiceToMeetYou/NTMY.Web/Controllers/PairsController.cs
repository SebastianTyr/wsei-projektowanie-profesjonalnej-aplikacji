using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NTMY.Application.Interfaces;
using NTMY.Application.Interfaces.Pairs.Commands;
using NTMY.Application.Interfaces.Pairs.DTOs;
using NTMY.Application.Interfaces.Pairs.Queries;
using NTMY.Web.ViewModels.Pairs;
using PlaygroundShared.Application.CQRS;
using PlaygroundShared.Domain;
using PlaygroundShared.Infrastructure;

namespace NTMY.Web.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("[controller]")]
    public class PairsController : ControllerBase
    {
        private readonly ICommandQueryDispatcherDecorator _commandQueryDispatcherDecorator;
        private readonly IMapper _mapper;
        private readonly ICorrelationContext _correlationContext;

        public PairsController(ICommandQueryDispatcherDecorator commandQueryDispatcherDecorator, IMapper mapper, ICorrelationContext correlationContext)
        {
            _commandQueryDispatcherDecorator = commandQueryDispatcherDecorator ?? throw new ArgumentNullException(nameof(commandQueryDispatcherDecorator));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
            _correlationContext = correlationContext ?? throw new ArgumentNullException(nameof(correlationContext));
        }

        [HttpPost("messages")]
        public async Task<IActionResult> SendMessageAsync([FromBody] AddMessageToPairViewModel viewModel)
        {
            var command = new AddMessageToPairCommand(new AggregateId(viewModel.PairId), new AggregateId(viewModel.ToUserId), viewModel.Message);
            await _commandQueryDispatcherDecorator.DispatchAsync(command);

            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> GetPairs()
        {
            var query = new GetUserPairsQuery(_correlationContext.CurrentUser.UserId.Value);

            return Ok(await _commandQueryDispatcherDecorator.DispatchAsync<GetUserPairsQuery, ListDto<PairInfoDto>>(query));
        }

        [HttpGet("{id}/messages")]
        public async Task<IActionResult> GetMessages(Guid id, DateTime? fromDate)
        {
            var query = new GetPairMessagesQuery(_correlationContext.CurrentUser.UserId.Value, new AggregateId(id), fromDate);

            return Ok(await _commandQueryDispatcherDecorator.DispatchAsync<GetPairMessagesQuery, ListDto<PairMessageDto>>(query));
        }

    }
}
