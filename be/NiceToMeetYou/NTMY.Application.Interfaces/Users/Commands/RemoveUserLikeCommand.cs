using PlaygroundShared.Application.CQRS;

namespace NTMY.Application.Interfaces.Users.Commands
{
    public class RemoveUserLikeCommand : ICommand
    {
        public int LikeNo { get; }

        public RemoveUserLikeCommand(int likeNo)
        {
            LikeNo = likeNo;
        }
    }
}