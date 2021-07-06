using System;
using System.Threading.Tasks;
using Autofac;
using Newtonsoft.Json;
using PlaygroundShared.Messages;

namespace NTMY.Application
{
    public class DomainEventMessagePublisher : IMessagePublisher
    {
        private readonly IComponentContext _context;

        public DomainEventMessagePublisher(IComponentContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task Publish(IMessage message)
        {

            Console.WriteLine(JsonConvert.SerializeObject(message));
        }
    }
}
