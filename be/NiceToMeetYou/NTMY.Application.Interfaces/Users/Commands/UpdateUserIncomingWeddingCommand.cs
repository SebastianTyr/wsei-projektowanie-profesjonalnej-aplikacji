using System;
using NTMY.Domain.Users;

namespace NTMY.Application.Interfaces.Users.Commands
{
    public class UpdateUserIncomingWeddingCommand : AddIncomingWeddingToUserCommand
    {
        public int No { get; }

        public UpdateUserIncomingWeddingCommand(int no, DateTime date, Address address, string description) : base(date, address, description)
        {
            No = no;
        }
    }
}