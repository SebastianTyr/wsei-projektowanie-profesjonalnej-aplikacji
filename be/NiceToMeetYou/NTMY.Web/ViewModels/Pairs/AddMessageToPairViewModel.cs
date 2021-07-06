using System;

namespace NTMY.Web.ViewModels.Pairs
{
    public class AddMessageToPairViewModel
    {
        public Guid PairId { get; set; }
        public Guid ToUserId { get; set; }
        public string Message { get; set; }
    }
}
