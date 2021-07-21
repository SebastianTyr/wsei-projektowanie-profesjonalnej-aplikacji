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
      ,W.Date AS IncomingWeddingDate
      ,W.Description AS IncomingWeddingDescription
FROM [dbo].[Users] AS U
OUTER APPLY(SELECT TOP 1 UW.Id, UW.Description, UW.Date FROM dbo.UserWeddings AS UW WHERE UW.Id = U.Id AND UW.IsArchived = 0 ORDER BY UW.Date) AS W";

        public UsersReadModel(ISqlConnectionConfiguration sqlConnectionConfiguration, ICorrelationContext correlationContext, IUserRepository userRepository)
        {
            _sqlConnectionConfiguration = sqlConnectionConfiguration ?? throw new ArgumentNullException(nameof(sqlConnectionConfiguration));
            _correlationContext = correlationContext ?? throw new ArgumentNullException(nameof(correlationContext));
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        }

        public async Task<IEnumerable<UserDto>> GetUsersAsync(GetUsersQuery query)
        {
            var sqlQuery = $@"
DECLARE @Ids TABLE(Id UNIQUEIDENTIFIER);
{declareStatement}

;WITH UsersWithDistance AS ({sqlWithStatement})
INSERT INTO @Ids
SELECT U.Id FROM UsersWithDistance AS U
/**where**/

;WITH UsersWithDistance AS ({sqlWithStatement})

SELECT * FROM UsersWithDistance AS U
/**where**/

SELECT P.Id
    ,P.No AS FileNo
    ,P.Name AS FileName
    ,@BaseUrl + '/' + P.Path AS FileUrl
FROM dbo.UserPhotos P
INNER JOIN @Ids AS Ids ON Ids.Id = P.Id
WHERE P.IsArchived = 0";

            var currentUser = await _userRepository.GetAsync(_correlationContext.CurrentUser.UserId.Value);

            var sqlBuilder = new SqlBuilder();
            var template = sqlBuilder.AddTemplate(sqlQuery, new
            {
                CurrentLongitude = currentUser.Coordinate.Longitude.ToString().Replace(",", "."),
                CurrentLatitude = currentUser.Coordinate.Latitude.ToString().Replace(",", "."),
                BaseUrl = query.BaseAppUrl
            });

            ApplyUsersWhereStatement(sqlBuilder, query);

            await using var connection = new SqlConnection(_sqlConnectionConfiguration.MainConnectionString);
            using var multi = await connection.QueryMultipleAsync(template.RawSql, template.Parameters);

            var users = multi.Read<UserDto>().ToList();
            var photos = multi.Read<UserPhotoDto>().ToList();

            foreach (var userDto in users)
            {
                userDto.Photos = photos.Where(x => x.Id == userDto.Id).ToList();
            }

            return users;
        }

        public async Task<IEnumerable<UserWeddingDto>> GetIncomingWeddingsAsync(GetIncomingWeddingsQuery query)
        {
            var sqlQuery = $@"
{declareStatement}
;WITH UsersWithDistance AS ({sqlWithStatement})

SELECT 
    U.Id AS UserId
    ,U.FirstName
    ,U.Distance AS UserDistance
    ,U.Gender
    ,W.No AS WeddingNo
    ,W.Description
    ,W.Date
    ,W.AddressStreet
    ,W.AddressCity
    ,W.AddressPostCode
    ,W.AddressCountry
FROM dbo.UserWeddings AS W
INNER JOIN UsersWithDistance AS U ON U.Id = W.Id
/**where**/
ORDER BY W.Date
";

            var currentUser = await _userRepository.GetAsync(_correlationContext.CurrentUser.UserId.Value);

            var sqlBuilder = new SqlBuilder();
            var template = sqlBuilder.AddTemplate(sqlQuery, new
            {
                CurrentLongitude = currentUser.Coordinate.Longitude.ToString().Replace(",", "."),
                CurrentLatitude = currentUser.Coordinate.Latitude.ToString().Replace(",", "."),
            });

            ApplyUsersWhereStatement(sqlBuilder, new GetUsersQuery(query.MaxDistance, query.MaxAge, query.Gender, null));
            sqlBuilder.Where(@"W.Date >= @Date", new {@Date = DateTime.UtcNow});
            sqlBuilder.Where("W.IsArchived = 0");

            await using var connection = new SqlConnection(_sqlConnectionConfiguration.MainConnectionString);
            return await connection.QueryAsync<UserWeddingDto>(template.RawSql, template.Parameters);
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
