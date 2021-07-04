using System;
using AutoMapper;
using GeoCoordinatePortable;
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
                .ForMember(x => x.WeightUnit, opt => opt.MapFrom(x => x.Weight.Unit))
                .ForMember(x => x.AddressCity, opt => opt.MapFrom(x => x.Address.City))
                .ForMember(x => x.AddressStreet, opt => opt.MapFrom(x => x.Address.Street))
                .ForMember(x => x.AddressPostCode, opt => opt.MapFrom(x => x.Address.PostCode))
                .ForMember(x => x.AddressCountry, opt => opt.MapFrom(x => x.Address.Country))
                .ForMember(x => x.Status, opt => opt.MapFrom(x => x.Status))
                .ForMember(x => x.CoordinateLatitude, opt => opt.MapFrom(x => x.Coordinate.Latitude))
                .ForMember(x => x.CoordinateLongitude, opt => opt.MapFrom(x => x.Coordinate.Longitude))
                .ForMember(x => x.Likes, opt => opt.MapFrom(x => x.Likes))
                .AfterMap((u, e) =>
                {
                    foreach (var userLikeEntity in e.Likes)
                    {
                        userLikeEntity.Id = e.Id;
                    }
                });

            CreateMap<UserEntity, User>()
                .ForMember(x => x.Id, opt => opt.MapFrom(x => new AggregateId(x.Id)))
                .ForMember(x => x.Height, opt => opt.MapFrom(x => new Height(x.HeightValue, x.HeightUnit)))
                .ForMember(x => x.Weight, opt => opt.MapFrom(x => new Weight(x.WeightValue, x.WeightUnit)))
                .ForMember(x => x.Status, opt => opt.MapFrom(x => x.Status))
                .ForMember(x => x.Address, opt => opt.MapFrom(x => new Address(x.AddressStreet, x.AddressCity, x.AddressPostCode, x.AddressCountry)))
                .ForMember(x => x.Coordinate, opt => opt.MapFrom(x => new GeoCoordinate(x.CoordinateLatitude, x.CoordinateLongitude)))
                .ForMember(x => x.Likes, opt => opt.MapFrom(x => x.Likes));

            CreateMap<UserLike, UserLikeEntity>()
                .ForMember(x => x.LikedUserId, opt => opt.MapFrom(x => x.LikedUserId.Id));

            CreateMap<UserLikeEntity, UserLike>()
                .ForMember(x => x.LikedUserId, opt => opt.MapFrom(x => new AggregateId(x.LikedUserId)));

            CreateMap<IDomainEvent, UserEventEntity>()
                .ConstructUsing(x => new UserEventEntity()
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
