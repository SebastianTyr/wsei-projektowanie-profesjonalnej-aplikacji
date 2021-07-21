using System;

namespace NTMY.Application.Notifications.Responses
{
    public class PairCreatedResponse
    {
        public Guid PairId { get; set; }
        public Guid FirstUserId { get; set; }
        public string FirstUserFirstName { get; set; }
        public Guid SecondUserId { get; set; }
        public string SecondUserFirstName { get; set; }
    }
}