using System;
using System.Linq;
using System.Threading.Tasks;
using NTMY.Application.Interfaces.Pairs;
using NTMY.Domain.Pairs;
using NTMY.Domain.Pairs.DataStructures;
using NTMY.Domain.Pairs.Factories;
using NTMY.Domain.Pairs.Repositories;
using NTMY.Domain.Pairs.Resources;
using NTMY.Domain.Users;
using NTMY.Domain.Users.Repositories;
using NTMY.Domain.Users.Resources;
using NTMY.SharedKernel;
using PlaygroundShared.Domain;
using PlaygroundShared.Infrastructure;

namespace NTMY.Application.Pairs
{
    public class PairService : IPairService
    {
        private readonly IPairRepository _pairRepository;
        private readonly IPairFactory _pairFactory;
        private readonly ICorrelationContext _correlationContext;
        private readonly IUserRepository _userRepository;

        public PairService(IPairRepository pairRepository, IPairFactory pairFactory, ICorrelationContext correlationContext, IUserRepository userRepository)
        {
            _pairRepository = pairRepository ?? throw new ArgumentNullException(nameof(pairRepository));
            _pairFactory = pairFactory ?? throw new ArgumentNullException(nameof(pairFactory));
            _correlationContext = correlationContext ?? throw new ArgumentNullException(nameof(correlationContext));
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        }

        public async Task AddPairToCurrentUserAsync(AggregateId id, AggregateId userId)
        {
            var likedUser = await GetUserOrThrowAsync(userId);
            if (!likedUser.Likes.Any(x => !x.IsArchived && x.LikedUserId == _correlationContext.CurrentUser.UserId))
            {
                throw new BusinessLogicException(PairResources.IncorrectUserMessage);
            }

            var pair = await _pairRepository.GetPairForUsersAsync(_correlationContext.CurrentUser.UserId.Value, userId);
            if (pair != null)
            {
                return;
            }

            pair = _pairFactory.Create(id, new PairDataStructure(_correlationContext.CurrentUser.UserId.Value, userId));
            await _pairRepository.PersistAsync(pair);
        }

        public async Task AddMessageToPairAsync(AggregateId pairId, AggregateId toUserId, string message)
        {
            var pair = await GetPairOrThrowAsync(pairId);
            pair.AddMessage(toUserId, message);

            await _pairRepository.PersistAsync(pair);
        }

        private async Task<User> GetUserOrThrowAsync(AggregateId userId)
        {
            var user = await _userRepository.GetAsync(userId);
            if (user == null)
            {
                throw new BusinessLogicException(UserResources.UserNotFoundMessage);
            }

            return user;
        }

        private async Task<Pair> GetPairOrThrowAsync(AggregateId pairId)
        {
            var pair = await _pairRepository.GetAsync(pairId);
            if (pair == null || pair.Status.Equals(PairStatus.Cancelled))
            {
                throw new BusinessLogicException(PairResources.PairNotFoundMessage);
            }

            return pair;
        }
    }
}
