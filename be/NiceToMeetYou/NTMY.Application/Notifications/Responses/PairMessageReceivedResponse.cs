using System;
using System.Collections.Generic;
using System.Text;

namespace NTMY.Application.Notifications.Responses
{
    public class PairMessageReceivedResponse
    {
        public Guid PairId { get; set; }
        public Guid FromUserId { get; set; }
        public Guid ToUserId { get; set; }
        public string Message { get; set; }
    }
}
