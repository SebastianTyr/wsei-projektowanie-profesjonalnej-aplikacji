using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using PlaygroundShared.Messages;

namespace NTMY.Infrastructure
{
    public class FakeMessagePublisher : IMessagePublisher
    {
        public Task Publish(IMessage message)
        {
            Console.WriteLine(JsonConvert.SerializeObject(message));

            return Task.CompletedTask;
        }
    }
}
