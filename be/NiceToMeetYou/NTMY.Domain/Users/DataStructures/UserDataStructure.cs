﻿using System;
using PlaygroundShared.Domain;

namespace NTMY.Domain.Users.DataStructures
{
    public class UserDataStructure
    {
        public AggregateId Id { get; }
        public string UserName { get; }
        public string FirstName { get; }
        public string SecondName { get; }
        public string Email { get; }
        public DateTime BirthDate { get; }
        public Gender Gender { get; }

        public UserDataStructure(AggregateId id, string userName, string firstName, string secondName, string email, DateTime birthDate, Gender gender)
        {
            Id = id;
            UserName = userName;
            FirstName = firstName;
            SecondName = secondName;
            Email = email;
            BirthDate = birthDate;
            Gender = gender;
        }
    }
}
