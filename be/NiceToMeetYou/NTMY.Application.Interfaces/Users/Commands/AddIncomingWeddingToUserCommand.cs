using System;
using NTMY.Domain.Users;
using PlaygroundShared.Application.CQRS;

namespace NTMY.Application.Interfaces.Users.Commands
{
    public class AddIncomingWeddingToUserCommand : ICommand
    {
        public DateTime Date { get; }
        public Address Address { get; }
        public string Description { get; }

        public AddIncomingWeddingToUserCommand(DateTime date, Address address, string description)
        {
            Date = date;
            Address = address;
            Description = description;
        }
    }
}