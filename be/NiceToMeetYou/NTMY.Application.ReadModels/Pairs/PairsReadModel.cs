using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Data.SqlClient;
using NTMY.Application.Interfaces.Pairs.DTOs;
using NTMY.Application.Interfaces.Pairs.Queries;
using NTMY.Application.Interfaces.Pairs.ReadModels;
using NTMY.Domain.Pairs;
using PlaygroundShared.Configurations;

namespace NTMY.Application.ReadModels.Pairs
{
    public class PairsReadModel : IPairsReadModel
    {
        private readonly ISqlConnectionConfiguration _sqlConnectionConfiguration;

        public PairsReadModel(ISqlConnectionConfiguration sqlConnectionConfiguration)
        {
            _sqlConnectionConfiguration = sqlConnectionConfiguration ?? throw new ArgumentNullException(nameof(sqlConnectionConfiguration));
        }

        public async Task<IEnumerable<PairInfoDto>> GetUserPairsAsync(GetUserPairsQuery query)
        {
            var sqlQuery = @"
SELECT 
	P.Id AS PairId
	,CASE WHEN @CurrentUserId = P.FirstUserId THEN P.SecondUserId ELSE P.FirstUserId END AS LikedUserId
	,CASE WHEN @CurrentUserId = P.FirstUserId THEN SU.FirstName ELSE FU.FirstName END AS LikedUserFirstName
	,PM.Message AS LastMessage
	,CASE WHEN @CurrentUserId = PM.ToUserId THEN 1 ELSE 0 END AS IsToYou
FROM dbo.Pairs AS P
INNER JOIN dbo.Users AS FU ON FU.Id = P.FirstUserId
INNER JOIN dbo.Users AS SU ON SU.Id = P.SecondUserId
OUTER APPLY(
	SELECT TOP 1
		PM.Id
		,PM.FromUserId
		,PM.ToUserId
		,PM.Message
	FROM dbo.PairMessages AS PM
	WHERE PM.Id = P.Id
	ORDER BY PM.SentDate DESC) AS PM
/**where**/";
			var sqlBuilder = new SqlBuilder();
            var template = sqlBuilder.AddTemplate(sqlQuery, new {CurrentUserId = query.UserId.Id});

            ApplyWherePairStatement(sqlBuilder);

            await using var connection = new SqlConnection(_sqlConnectionConfiguration.MainConnectionString);
            return await connection.QueryAsync<PairInfoDto>(template.RawSql, template.Parameters);
        }

        public async Task<IEnumerable<PairMessageDto>> GetPairMessagesAsync(GetPairMessagesQuery query)
        {
            var sqlQuery = @"
SELECT
	P.Id AS PairId
	,PM.No AS PairMessageNo 
	,PM.FromUserId AS FromUserId
	,PM.ToUserId AS ToUserId
	,PM.Message AS Message
	,PM.SentDate AS SentDate
FROM dbo.PairMessages AS PM
INNER JOIN dbo.Pairs AS P ON P.Id = PM.Id
/**where**/
ORDER BY PM.SentDate DESC";
            var sqlBuilder = new SqlBuilder();
            var template = sqlBuilder.AddTemplate(sqlQuery, new { CurrentUserId = query.UserId.Id });

            ApplyWherePairStatement(sqlBuilder);
            ApplyWhereMessageStatement(sqlBuilder, query);

            await using var connection = new SqlConnection(_sqlConnectionConfiguration.MainConnectionString);
            return await connection.QueryAsync<PairMessageDto>(template.RawSql, template.Parameters);
        }

        private void ApplyWherePairStatement(SqlBuilder sqlBuilder)
        {
            sqlBuilder.Where(@"(P.FirstUserId = @CurrentUserId OR P.SecondUserId = @CurrentUserId)");
            sqlBuilder.Where(@"P.Status IN @Statuses", new { Statuses = new List<int>() { (int)PairStatus.Matched, (int)PairStatus.Completed } });
        }

        private void ApplyWhereMessageStatement(SqlBuilder sqlBuilder, GetPairMessagesQuery query)
        {
            if (query.FromDate.HasValue)
            {
                sqlBuilder.Where(@"PM.SentDate >= @FromDate", new { FromDate = query.FromDate.Value });
            }

            sqlBuilder.Where(@"PM.Id = @PairId", new { PairId = query.PairId.Id });
        }
    }
}
