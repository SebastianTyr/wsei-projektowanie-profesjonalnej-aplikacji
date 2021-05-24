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
        }
    }
}
