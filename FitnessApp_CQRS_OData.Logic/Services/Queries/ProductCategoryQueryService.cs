using FitnessApp_CQRS_OData.Data_EF;
using FitnessApp_CQRS_OData.Data_EF.Models;
using FitnessApp_CQRS_OData.Logic.Builders;
using FitnessApp_CQRS_OData.Logic.Models;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace FitnessApp_CQRS_OData.Logic.Services.Queries
{
    public class ProductCategoryQueryService : BaseService, IProductCategoryQueryService
    {
        public ProductCategoryQueryService(ProductContext context) : base(context)
        {
        }

        public IQueryable<ProductCategoryDto> Get()
        {
            var categoryDbs = _context.ProductCategories.Include(a => a.ProductSubCategories).AsEnumerable();
            return ProductCategoryBuilder.Build(categoryDbs);
        }

        public IQueryable<ProductCategoryDto> GetById(int? id)
        {
            var categoryDb = _context.ProductCategories
                .Include(a => a.ProductSubCategories)
                .AsQueryable()
                .Where(c => c.Id == id);

            return ProductCategoryBuilder.Build(categoryDb);
        }
    }
}
