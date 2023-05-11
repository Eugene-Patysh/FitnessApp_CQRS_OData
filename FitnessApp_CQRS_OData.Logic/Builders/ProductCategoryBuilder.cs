using FitnessApp_CQRS_OData.Data_EF.Models;
using FitnessApp_CQRS_OData.Logic.Models;
using FitnessApp_CQRS_OData.Logic.Models.Commands;

namespace FitnessApp_CQRS_OData.Logic.Builders
{
    public static class ProductCategoryBuilder
    {
        public static ProductCategoryDb Build(ProductCategoryCreateCommand createCommand)
        {
            return new ProductCategoryDb
            {
                Title = createCommand?.Title,
                Created = DateTime.UtcNow,
                Updated = DateTime.UtcNow,
            };
        }

        public static ProductCategoryDb Build(ProductCategoryUpdateCommand createCommand)
        {
            return new ProductCategoryDb
            {
                Id = createCommand?.Id,
                Title = createCommand?.Title,
                Updated = DateTime.UtcNow,
            };
        }

        public static ProductCategoryDto Build(ProductCategoryDb db)
        {
            return db != null
                ? new ProductCategoryDto()
                {
                    Id = db.Id,
                    Title = db.Title,
                    SubCategoriesCount = db.ProductSubCategories?.Count() ?? 0,
                    ProductSubCategories = ProductSubCategoryBuilder.Build(db.ProductSubCategories),
                    Created = db.Created,
                    Updated = db.Updated
                }
                : null;
        }

        public static ProductCategoryDb Build(ProductCategoryDto db)
        {
            return db != null
                ? new ProductCategoryDb()
                {
                    Id = db.Id,
                    Title = db.Title,
                    Created = db.Created,
                    Updated = db.Updated
                }
                : null;
        }

        public static IQueryable<ProductCategoryDto> Build(IEnumerable<ProductCategoryDb> dbs)
        {
            return dbs?.Select(db => Build(db)).AsQueryable();
        }

        public static IQueryable<ProductCategoryDb> Build(IQueryable<ProductCategoryDto> dbs)
        {
            return dbs?.Select(db => Build(db));
        }
    }
}
