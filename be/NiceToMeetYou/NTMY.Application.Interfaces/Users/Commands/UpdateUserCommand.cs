using System;
using NTMY.Domain.Users;
using PlaygroundShared.Application.CQRS;
using PlaygroundShared.Domain;

namespace NTMY.Application.Interfaces.Users.Commands
{
    public class UpdateUserCommand : ICommand
    {
        public AggregateId Id { get; }
        public string FirstName { get; }
        public string SecondName { get; }
        public Gender Gender { get; }
        public Weight Weight { get; }
        public Height Height { get; }
        public DateTime BirthDate { get; }

        public UpdateUserCommand(AggregateId id, string firstName, string secondName, Gender gender, Weight weight, Height height, DateTime birthDate)
        {
            Id = id;
            FirstName = firstName;
            SecondName = secondName;
            Gender = gender;
            Weight = weight;
            Height = height;
            BirthDate = birthDate;
        }
    }
}