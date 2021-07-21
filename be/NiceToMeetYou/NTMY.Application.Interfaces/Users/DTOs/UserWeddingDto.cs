using System;
using NTMY.Domain.Users;

namespace NTMY.Application.Interfaces.Users.DTOs
{
    public class UserWeddingDto
    {
        public Guid UserId { get; set; }
        public string FirstName { get; set; }
        public int UserDistance { get; set; }
        public Gender Gender { get; set; }
        public int WeddingNo { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public string AddressStreet { get; set; }
        public string AddressCity { get; set; }
        public string AddressPostCode { get; set; }
        public string AddressCountry { get; set; }
    }
}