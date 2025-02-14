﻿using System;
using NTMY.Domain.Users;

namespace NTMY.Application.Interfaces.Users.DTOs
{
    public class LoggedUserDto
    {
        public Guid Id { get; }
        public string UserName { get; }
        public string Email { get; }
        public string FirstName { get; }
        public string SecondName { get;}
        public string JwtToken { get; }
        public Gender Gender { get; }

        public LoggedUserDto(Guid id, string userName, string email, string firstName, string secondName, string jwtToken, Gender gender)
        {
            Id = id;
            UserName = userName;
            Email = email;
            FirstName = firstName;
            SecondName = secondName;
            JwtToken = jwtToken;
            Gender = gender;
        }
    }
}
