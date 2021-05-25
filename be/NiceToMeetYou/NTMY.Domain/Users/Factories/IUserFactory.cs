using NTMY.Domain.Users.DataStructures;
using PlaygroundShared.Domain;

namespace NTMY.Domain.Users.Factories
{
    public interface IUserFactory : IDomainFactory
    {
        User Create(UserDataStructure userDataStructure);
    }
}
