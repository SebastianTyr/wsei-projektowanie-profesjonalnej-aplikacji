using System;
using NTMY.Domain.Users;
using PlaygroundShared.Application.CQRS;
using PlaygroundShared.Domain;

namespace NTMY.Application.Interfaces.Users.Commands
{
    public class RegisterUserCommand : ICommand
    {
        public AggregateId Id { get; }
        public string UserName { get; }
        public string FirstName { get; }
        public string SecondName { get; }
        public string Email { get; }
        public Gender Gender { get; }
        public DateTime BirthDate { get; }
        public string Password { get; }
        public string ConfirmPassword { get; }

        public RegisterUserCommand(string userName, string firstName, string secondName, string email, Gender gender, DateTime birthDate, string password, string confirmPassword)
        {
            Id = AggregateId.Generate();
            UserName = userName;
            FirstName = firstName;
            SecondName = secondName;
            Email = email;
            Gender = gender;
            BirthDate = birthDate;
            Password = password;
            ConfirmPassword = confirmPassword;
        }
    }
}
