using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using NTMY.Application.Interfaces.Users.DTOs;
using NTMY.Web.ViewModels.Users;

namespace NTMY.Web.MappingProfiles
{
    public class UserControllerMappingProfile : Profile
    {
        public UserControllerMappingProfile()
        {
            CreateMap<LoggedUserDto, LoggedUserViewModel>();
            CreateMap<CurrentUserInfoDto, CurrentUserViewModel>()
                .ForMember(x => x.Height, opt => opt.MapFrom(x => new HeightViewModel()
                {
                    Unit = x.Height.Unit,
                    Value = x.Height.Value
                }))
                .ForMember(x => x.Weight, opt => opt.MapFrom(x => new WeightViewModel()
                {
                    Unit = x.Weight.Unit,
                    Value = x.Weight.Value
                }))
                .ForMember(x => x.Address, opt => opt.MapFrom(x => new AddressViewModel()
                {
                    City = x.Address.City,
                    Country = x.Address.Country,
                    PostCode = x.Address.PostCode,
                    Street = x.Address.Street
                }))
                .ForMember(x => x.Coordinate, opt => opt.MapFrom(x => new CoordinateViewModel()
                {
                    Latitude = x.Latitude,
                    Longitude = x.Longitude
                }));

            CreateMap<UserPhotoDto, UserPhotoViewModel>()
                .ForMember(x => x.PhotoNo, opt => opt.MapFrom(x => x.FileNo))
                .ForMember(x => x.PhotoUrl, opt => opt.MapFrom(x => x.FileUrl));
        }
    }
}
