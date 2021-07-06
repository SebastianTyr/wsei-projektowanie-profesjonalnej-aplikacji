using System;
using AutoMapper;
using Newtonsoft.Json;
using NTMY.Domain.Pairs;
using PlaygroundShared.Domain;
using PlaygroundShared.DomainEvents;

namespace NTMY.Infrastructure.Persistance.Pairs
{
    public class PairMappingProfile : Profile
    {
        public PairMappingProfile()
        {
            CreateMap<Guid, AggregateId>()
                .ConstructUsing(x => new AggregateId(x));

            CreateMap<AggregateId, Guid>()
                .ConstructUsing(x => new Guid(x.ToString()));

            CreateMap<Pair, PairEntity>()
                .ForMember(x => x.Messages, opt => opt.MapFrom(x => x.Messages))
                .AfterMap((a, e) =>
                {
                    foreach (var pairMessageEntity in e.Messages)
                    {
                        pairMessageEntity.Id = e.Id;
                    }
                });

            CreateMap<PairEntity, Pair>()
                .ForMember(x => x.Messages, opt => opt.MapFrom(x => x.Messages));

            CreateMap<PairMessage, PairMessageEntity>();
            CreateMap<PairMessageEntity, PairMessage>();

            CreateMap<IDomainEvent, PairEventEntity>()
                .ConstructUsing(x => new PairEventEntity()
                {
                    Id = Guid.NewGuid(),
                    AggregateId = x.Id.ToGuid(),
                    CorrelationId = Guid.NewGuid(),
                    CreatedAt = DateTime.Now,
                    Event = JsonConvert.SerializeObject(x),
                    EventType = x.GetType().Name,
                    PublishedAt = DateTime.Now
                })
                .ForAllMembers(opt => opt.Ignore());
        }
    }
}
