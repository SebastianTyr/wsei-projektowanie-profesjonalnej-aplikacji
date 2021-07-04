using GeoCoordinatePortable;

namespace NTMY.Domain.Users.DataStructures
{
    public class UserAdditionalInformationDataStructure
    {
        public Height Height { get; }
        public Weight Weight { get; }
        public Address Address { get; }
        public string Description { get; }
        public Gender WantedGender { get; }
        public GeoCoordinate Coordinate { get; }

        public UserAdditionalInformationDataStructure(Height height, Weight weight, Address address, string description, Gender wantedGender, GeoCoordinate coordinate)
        {
            Height = height;
            Weight = weight;
            Address = address;
            Description = description;
            WantedGender = wantedGender;
            Coordinate = coordinate;
        }
    }
}