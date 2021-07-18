using System;

namespace NTMY.Application.Interfaces.Users.DTOs
{
    public class UserPhotoDto
    {
        public Guid Id { get; set; }
        public int FileNo { get; set; }
        public string FileName { get; set; }
        public string FileUrl { get; set; }
    }
}