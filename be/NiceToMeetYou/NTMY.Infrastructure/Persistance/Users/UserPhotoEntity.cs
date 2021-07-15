using PlaygroundShared.Infrastructure.Persistance;

namespace NTMY.Infrastructure.Persistance.Users
{
    public class UserPhotoEntity : BaseDbEntity
    {
        public int No { get; set; }
        public string Path { get; set; }
        public string Name { get; set; }
        public string Format { get; set; }
        public long SizeInBytes { get; set; }
        public bool IsArchived { get; set; }
    }
}