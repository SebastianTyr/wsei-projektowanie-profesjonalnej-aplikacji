using System;
using AutoMapper;
using Newtonsoft.Json;
using NTMY.Domain.Users;
using PlaygroundShared.Domain;
using PlaygroundShared.DomainEvents;

namespace NTMY.Infrastructure.Persistance.Users
{
    public class UserMappingProfile : Profile
    {
        public UserMappingProfile()
        {
            CreateMap<User, UserEntity>()
                .ForMember(x => x.Id, opt => opt.MapFrom(x => x.Id.Id))
                .ForMember(x => x.HeightValue, opt => opt.MapFrom(x => x.Height.Value))
                .ForMember(x => x.HeightUnit, opt => opt.MapFrom(x => x.Height.Unit))
                .ForMember(x => x.WeightValue, opt => opt.MapFrom(x => x.Weight.Value))
                .ForMember(x => x.WeightUnit, opt => opt.MapFrom(x => x.Weight.Unit));

            CreateMap<UserEntity, User>()
                .ForMember(x => x.Id, opt => opt.MapFrom(x => new AggregateId(x.Id)))
                .ForMember(x => x.Height, opt => opt.MapFrom(x => new Height(x.HeightValue, x.HeightUnit)))
                .ForMember(x => x.Weight, opt => opt.MapFrom(x => new Weight(x.WeightValue, x.WeightUnit)));

            CreateMap<IDomainEvent, UserEventEntity>()
                .ConstructUsing(x => new UserEventEntity()
                {
                    AggregateId = x.Id.ToGuid(),
                    CorrelationId = Guid.NewGuid(),
                    CreatedAt = DateTime.Now,
                    Event = JsonConvert.SerializeObject(x),
                    EventType = x.GetType().Name,
                    PublishedAt = DateTime.Now
                });
        }
    }
}
