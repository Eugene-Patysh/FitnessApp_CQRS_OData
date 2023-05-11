using FitnessApp_CQRS_OData.Logic.Models;

namespace FitnessApp_CQRS_OData.Logic.Services.Queries
{
    public interface IProductCategoryQueryService
    {
        IQueryable<ProductCategoryDto> Get();
        IQueryable<ProductCategoryDto> GetById(int? id);
    }
}
