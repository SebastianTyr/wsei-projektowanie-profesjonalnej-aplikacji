using System;
using PlaygroundShared.Application.CQRS;

namespace NTMY.Application.Interfaces.Users.Queries
{
    public class GetUserQuery : IQuery
    {
        public Guid UserId { get; }
        public string BaseAppUrl { get; }

        public GetUserQuery(Guid userId, string baseAppUrl)
        {
            UserId = userId;
            BaseAppUrl = baseAppUrl;
        }
    }
}