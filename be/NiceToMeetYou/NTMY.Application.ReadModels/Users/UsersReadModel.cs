using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Data.SqlClient;
using NTMY.Application.Interfaces.Users.DTOs;
using NTMY.Application.Interfaces.Users.Queries;
using NTMY.Application.Interfaces.Users.ReadModels;
using NTMY.Domain.Users.Repositories;
using PlaygroundShared.Configurations;
using PlaygroundShared.Infrastructure;

namespace NTMY.Application.ReadModels.Users
{
    public class UsersReadModel : IUsersReadModel
    {
        private readonly ISqlConnectionConfiguration _sqlConnectionConfiguration;
        private readonly ICorrelationContext _correlationContext;
        private readonly IUserRepository _userRepository;

        private string declareStatement = @"
DECLARE @CurrentCoordinate geography = 'POINT(' + @CurrentLongitude + ' ' + @CurrentLatitude + ')'";
        private string sqlWithStatement = @"
SELECT U.[Id]
      ,U.[UserName]
      ,U.[FirstName]
      ,U.[SecondName]
      ,U.[BirthDate]
      ,U.[WeightValue]
      ,U.[WeightUnit]
      ,U.[HeightValue]
      ,U.[HeightUnit]
      ,U.[Gender]
      ,U.[Description]
      ,U.[LastLoginDate]
      ,U.[WantedGender]
	  ,DATEDIFF(YEAR, U.BirthDate, GETDATE()) AS Age
	  ,geography::STGeomFromText('POINT(' + 
                CAST(U.[CoordinateLongitude] AS VARCHAR(20)) + ' ' + 
                CAST(U.[CoordinateLatitude] AS VARCHAR(20)) + ')', 4326).STDistance(@CurrentCoordinate) / 1000 AS Distance
FROM [dbo].[Users] AS U";

        public UsersReadModel(ISqlConnectionConfiguration sqlConnectionConfiguration, ICorrelationContext correlationContext, IUserRepository userRepository)
        {
            _sqlConnectionConfiguration = sqlConnectionConfiguration ?? throw new ArgumentNullException(nameof(sqlConnectionConfiguration));
            _correlationContext = correlationContext ?? throw new ArgumentNullException(nameof(correlationContext));
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        }

        public async Task<IEnumerable<UserDto>> GetUsersAsync(GetUsersQuery query)
        {
            var sqlQuery = $@"
{declareStatement}
;WITH UsersWithDistance AS ({sqlWithStatement})

SELECT * FROM UsersWithDistance AS U
/**where**/";

            var currentUser = await _userRepository.GetAsync(_correlationContext.CurrentUser.UserId.Value);

            var sqlBuilder = new SqlBuilder();
            var template = sqlBuilder.AddTemplate(sqlQuery, new
            {
                CurrentLongitude = currentUser.Coordinate.Longitude.ToString().Replace(",", "."),
                CurrentLatitude = currentUser.Coordinate.Latitude.ToString().Replace(",", ".")
            });

            ApplyUsersWhereStatement(sqlBuilder, query);

            await using var connection = new SqlConnection(_sqlConnectionConfiguration.MainConnectionString);
            return await connection.QueryAsync<UserDto>(template.RawSql, template.Parameters);
        }

        private void ApplyUsersWhereStatement(SqlBuilder sqlBuilder, GetUsersQuery query)
        {
            if (query.Gender != null && query.Gender.Any())
            {
                sqlBuilder.Where(@"U.Gender IN @Genders", new {Genders = query.Gender.Select(x => (int) x)});
            }

            if (query.MaxAge.HasValue)
            {
                sqlBuilder.Where(@"U.Age <= @MaxAge", new {MaxAge = query.MaxAge.Value});
            }

            sqlBuilder.Where(@"U.Distance <= @Distance", new {Distance = query.MaxDistance});
            sqlBuilder.Where(@"U.Id != @CurrentUserId", new {@CurrentUserId = _correlationContext.CurrentUser.UserId.Value.Id});
        }
    }
}
