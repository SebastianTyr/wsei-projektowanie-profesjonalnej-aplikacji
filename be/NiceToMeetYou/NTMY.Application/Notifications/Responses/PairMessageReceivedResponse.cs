using System;

namespace NTMY.Application.Notifications.Responses
{
    public class PairMessageReceivedResponse
    {
        public Guid PairId { get; set; }
        public int PairMessageNo { get; set; }
        public Guid FromUserId { get; set; }
        public Guid ToUserId { get; set; }
        public string Message { get; set; }
    }
}
