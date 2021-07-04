using GeoCoordinatePortable;
using NTMY.Domain.Users;
using PlaygroundShared.Application.CQRS;

namespace NTMY.Application.Interfaces.Users.Commands
{
    public class SetUserAdditionalInformationCommand : ICommand
    {
        public Height Height { get; }
        public Weight Weight { get; }
        public Address Address { get; }
        public string Description { get; }
        public Gender WantedGender { get; }
        public GeoCoordinate Coordinate { get; }

        public SetUserAdditionalInformationCommand(Height height, Weight weight, Address address, string description, Gender wantedGender, GeoCoordinate coordinate)
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