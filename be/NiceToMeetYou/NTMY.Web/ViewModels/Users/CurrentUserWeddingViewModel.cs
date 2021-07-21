using System;

namespace NTMY.Web.ViewModels.Users
{
    public class CurrentUserWeddingViewModel
    {
        public int WeddingNo { get; set; }
        public string Description { get; set; }
        public AddressViewModel Address { get; set; }
        public DateTime Date { get; set; }
    }
}