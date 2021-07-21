using System;
using NTMY.Domain.Users;

namespace NTMY.Application.Interfaces.Users.DTOs
{
    public class CurrentUserWeddingDto
    {
        public int WeddingNo { get; set; }
        public string Description { get; set; }
        public Address Address { get; set; }
        public DateTime Date { get; set; }
    }
}