using System;

namespace NTMY.Web.ViewModels.Users
{
    public class AddIncomingWeddingToUserViewModel
    {
        public DateTime Date { get; set; }
        public AddressViewModel Address { get; set; }
        public string Description { get; set; }
    }
}