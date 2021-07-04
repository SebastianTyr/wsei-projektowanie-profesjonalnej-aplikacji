namespace NTMY.Web.ViewModels.Users
{
    public class SetUserAdditionalInformationViewModel
    {
        public HeightViewModel Height { get; set; }
        public WeightViewModel Weight { get; set; }
        public AddressViewModel Address { get; set; }
        public string Description { get; set; }
        public int WantedGender { get; set; }
        public CoordinateViewModel Coordinate { get; set; }
    }
}