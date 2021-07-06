using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace NTMY.Application.Notifications.Hubs
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class PairMessagesHub : Hub
    {
    }
}
