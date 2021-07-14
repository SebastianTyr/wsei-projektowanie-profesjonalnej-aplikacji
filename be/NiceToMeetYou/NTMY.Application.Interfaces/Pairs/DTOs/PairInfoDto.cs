using System;

namespace NTMY.Application.Interfaces.Pairs.DTOs
{
    public class PairInfoDto
    {
        public Guid PairId { get; set; }
        public Guid LikedUserId { get; set; }
        public string LikedUserFirstName { get; set; }
        public string LastMessage { get; set; }
        public bool IsToYou { get; set; }
    }
}
