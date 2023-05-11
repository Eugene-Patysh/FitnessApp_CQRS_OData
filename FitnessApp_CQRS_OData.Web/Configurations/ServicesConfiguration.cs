using FitnessApp_CQRS_OData.Data_EF;
using FitnessApp_CQRS_OData.Logic.Models;
using FitnessApp_CQRS_OData.Logic.Services.Queries;
using FitnessApp_CQRS_OData.Logic.Validators;
using FluentValidation;

namespace FitnessApp_CQRS_OData.Web.Configurations
{
    public static class ServicesConfiguration
    {
        public static void Configure(WebApplicationBuilder builder)
        {
            builder.Services.AddTransient<ProductContext>();

            builder.Services.AddTransient<ICustomValidator<ProductCategoryDto>, CustomValidator<ProductCategoryDto>>();

            builder.Services.AddTransient<IValidator<ProductCategoryDto>, ProductCategoryValidator>();

            builder.Services.AddTransient<IProductCategoryQueryService, ProductCategoryQueryService>();
        }
    }
}
