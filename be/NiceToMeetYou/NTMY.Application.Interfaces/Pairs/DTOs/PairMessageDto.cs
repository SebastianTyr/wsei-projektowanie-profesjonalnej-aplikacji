using System;

namespace NTMY.Application.Interfaces.Pairs.DTOs
{
    public class PairMessageDto
    {
        public Guid PairId { get; set; }
        public int PairMessageNo { get; set; }
        public Guid FromUserId { get; set; }
        public Guid ToUserId { get; set; }
        public string Message { get; set; }
        public DateTime SentDate { get; set; }
    }
}