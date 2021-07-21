using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using NTMY.SharedKernel;
using PlaygroundShared.Infrastructure;

namespace NTMY.Web.Extensions
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;

        public ErrorHandlingMiddleware(RequestDelegate next) => this._next = next ?? throw new ArgumentNullException(nameof(next));

        public async Task InvokeAsync(HttpContext context, ICorrelationContext correlationContext, ILogger<ErrorHandlingMiddleware> logger)
        {
            try
            {
                await this._next(context);
            }
            catch (Exception ex)
            {
                var message = string.Empty;
                if (ex is BusinessLogicException businessLogicException)
                {
                    message = ex.Message;
                }
                else
                {
                    logger.LogError(ex.ToString());
                    throw;
                }

                logger.LogError(ex.ToString());
                context.Response.Clear();
                context.Response.StatusCode = 400;
                context.Response.ContentType = "application/json; charset=utf-8";
                context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
                string json = JsonConvert.SerializeObject(new { message });
                await context.Response.WriteAsync(json);
            }
        }
    }
}