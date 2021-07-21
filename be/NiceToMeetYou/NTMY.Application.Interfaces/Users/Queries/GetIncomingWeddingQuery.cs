using NTMY.Domain.Users;
using PlaygroundShared.Application.CQRS;

namespace NTMY.Application.Interfaces.Users.Queries
{
    public class GetIncomingWeddingsQuery : IQuery
    {
        public int MaxDistance { get; }
        public int? MaxAge { get; }
        public Gender[] Gender { get; }

        public GetIncomingWeddingsQuery(int maxDistance, int? maxAge, Gender[] gender)
        {
            MaxDistance = maxDistance;
            MaxAge = maxAge;
            Gender = gender;
        }
    }
}