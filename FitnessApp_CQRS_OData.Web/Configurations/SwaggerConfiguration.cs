using FitnessApp_CQRS_OData.Web.Attributes;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Reflection;

namespace FitnessApp_CQRS_OData.Web.Configurations
{
    public static class SwaggerConfiguration
    {
        public static void Configure(WebApplicationBuilder builder)
        {
            builder.Services.AddSwaggerGen(options =>
            {
                // enable Swagger examples
                // install Swashbuckle.AspNetCore.Filters nuget
                // [SwaggerRequestExample] & [SwaggerResponseExample]
                // version < 3.0 like this: c.OperationFilter<ExamplesOperationFilter>(); 
                // version 3.0 like this: c.AddSwaggerExamples(services.BuildServiceProvider());
                // version > 4.0 like this:
                options.ExampleFilters();

                // configure swagger to use generated xml
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                options.IncludeXmlComments(xmlPath);

                options.OperationFilter<ODataOperationFilter>();
            });

            // add swagger examples
            builder.Services.AddSwaggerExamplesFromAssemblies(Assembly.GetEntryAssembly());

            // add options configuration
            builder.Services.ConfigureOptions<ConfigureSwaggerOptions>();
        }

        public static void UseSwagger(WebApplication app)
        {
            var apiVersionDescriptionProvider = app.Services.GetRequiredService<IApiVersionDescriptionProvider>();
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(options =>
            {
                foreach (var description in apiVersionDescriptionProvider.ApiVersionDescriptions)
                {
                    options.SwaggerEndpoint($"/swagger/{description.GroupName}/swagger.json", description.GroupName.ToUpperInvariant());
                    options.RoutePrefix = string.Empty;
                }
                //options.SwaggerEndpoint("/swagger/v1.0/swagger.json", "v1.0");
                //options.RoutePrefix = string.Empty;
            });
        }
    }
}
