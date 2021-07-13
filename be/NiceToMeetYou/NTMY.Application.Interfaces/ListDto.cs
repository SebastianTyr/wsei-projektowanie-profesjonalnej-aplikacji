using System.Collections.Generic;
using System.Linq;

namespace NTMY.Application.Interfaces
{
    public class ListDto<TDto>
    {
        public IEnumerable<TDto> Items { get; }
        public int Count => Items.Count();

        public ListDto(IEnumerable<TDto> items)
        {
            Items = items == null ? new List<TDto>() : items.ToList();
        }
    }
}
