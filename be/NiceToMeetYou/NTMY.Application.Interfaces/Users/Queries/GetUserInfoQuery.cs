using PlaygroundShared.Application.CQRS;

namespace NTMY.Application.Interfaces.Users.Queries
{
    public class GetCurrentUserInfoQuery : IQuery
    {
        public GetCurrentUserInfoQuery(string baseUrl)
        {
            BaseUrl = baseUrl;
        }

        public string BaseUrl { get; }
    }
}
