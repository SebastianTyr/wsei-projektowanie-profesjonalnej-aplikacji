using Microsoft.AspNetCore.Http;
using PlaygroundShared.Application.CQRS;

namespace NTMY.Application.Interfaces.Users.Commands
{
    public class UploadUserPhotoCommand : ICommand
    {
        public IFormFile FormFile { get; }

        public UploadUserPhotoCommand(IFormFile formFile)
        {
            FormFile = formFile;
        }
    }
}