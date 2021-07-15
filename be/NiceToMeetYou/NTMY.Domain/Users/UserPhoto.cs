using NTMY.SharedKernel;

namespace NTMY.Domain.Users
{
    public class UserPhoto : IDomainEntity
    {
        public int No { get; private set; }
        public string Path { get; private set; }
        public string Name { get; private set; }
        public string Format { get; private set; }
        public long SizeInBytes { get; private set; }
        public bool IsArchived { get; private set; }

        public UserPhoto(int no, string path, string name, string format, long sizeInBytes)
        {
            No = no;
            Path = path;
            Name = name;
            Format = format;
            SizeInBytes = sizeInBytes;
        }

        private UserPhoto()
        {
        }

        public void MarkAsArchived()
        {
            IsArchived = true;
        }
    }
}