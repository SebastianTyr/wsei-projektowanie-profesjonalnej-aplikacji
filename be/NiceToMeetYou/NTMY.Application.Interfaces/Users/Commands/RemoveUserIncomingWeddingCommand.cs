using PlaygroundShared.Application.CQRS;

namespace NTMY.Application.Interfaces.Users.Commands
{
    public class RemoveUserIncomingWeddingCommand : ICommand
    {
        public RemoveUserIncomingWeddingCommand(int no)
        {
            No = no;
        }

        public int No { get; }
    }
}