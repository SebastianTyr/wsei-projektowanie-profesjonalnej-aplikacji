using System;
using System.Collections.Generic;
using NTMY.Domain.Users;

namespace NTMY.Application.Interfaces.Users.DTOs
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public int Distance { get; set; }
        public int Age { get; set; }
        public decimal WeightValue { get; set; }
        public string WeightUnit { get; set; }
        public decimal HeightValue { get; set; }
        public string HeightUnit { get; set; }
        public Gender Gender { get; set; }
        public string Description { get; set; }
        public List<UserPhotoDto> Photos { get; set; }
        public DateTime? IncomingWeddingDate { get; set; }
        public string IncomingWeddingDescription { get; set; }
    }
}
