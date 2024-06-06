using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using MimeKit;
using MoOnlineStore.Api.Errors;
using MoOnlineStore.Core.DTO.Email;
using MoOnlineStore.Core.Interfaces;
using System;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;

namespace MoOnlineStore.Api.Middeware
{
    public class ExceptionMiddelware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddelware> _logger;
        private readonly IHostEnvironment _env;
        private readonly IConfiguration _config;
        public  EmailConfiguration _emailConfig;
        private readonly IEmailSender _emailSender;

        public ExceptionMiddelware(RequestDelegate next, ILogger<ExceptionMiddelware> logger,
            IHostEnvironment env,IEmailSender emailsender, IConfiguration config)
        {
            _next = next;
            _logger = logger;
            _env = env;
            _config = config;
            _emailSender = emailsender;
            _emailConfig = _config
             .GetSection("EmailConfiguration")
             .Get<EmailConfiguration>();
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                
                var response = _env.IsDevelopment()
                    ? new ApiException((int)HttpStatusCode.InternalServerError, ex.Message, ex.StackTrace.ToString())
                    : new ApiException((int)HttpStatusCode.InternalServerError);
                if (_env.IsProduction())
                {
                    senderroremail(ex);
                }
                var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

                var json = JsonSerializer.Serialize(response, options);

                await context.Response.WriteAsync(json);
            }
        }

        private void senderroremail(Exception ex)
        {
            var emailMessage = CreateerrorEmailMessage(ex);         
            _emailSender.SendEmailAsync(emailMessage);
          
        }
        private MimeMessage CreateerrorEmailMessage(Exception ex)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress(_emailConfig.From));
            emailMessage.To.Add(new MailboxAddress("kiryasjoelonlinestore@gmail.com"));
            emailMessage.Subject = "internal server error";
            emailMessage.Importance = MessageImportance.High;
            var bodyBuilder = new BodyBuilder
            {
                HtmlBody = string.Format(
           "error happen<br />!!! error code <br />{0}<br /> error stack trace <br />{1}<br /> error details <br />{2}", HttpStatusCode.InternalServerError.ToString(),ex.Message,ex.StackTrace)
            };
            emailMessage.Body = bodyBuilder.ToMessageBody();
            return emailMessage; 

        }
    }
}
