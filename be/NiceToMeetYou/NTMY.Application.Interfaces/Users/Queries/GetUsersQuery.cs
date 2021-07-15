using NTMY.Domain.Users;
using PlaygroundShared.Application.CQRS;

namespace NTMY.Application.Interfaces.Users.Queries
{
    public class GetUsersQuery : IQuery
    {
        public int MaxDistance { get; }
        public int? MaxAge { get; }
        public Gender[] Gender { get; }
        public string BaseAppUrl { get; }

        public GetUsersQuery(int maxDistance, int? maxAge, Gender[] gender, string baseAppUrl)
        {
            MaxDistance = maxDistance;
            MaxAge = maxAge;
            Gender = gender;
            BaseAppUrl = baseAppUrl;
        }
    }
}