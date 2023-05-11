using FitnessApp_CQRS_OData.Data_EF.Models;
using FitnessApp_CQRS_OData.Logic.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp_CQRS_OData.Logic.Builders
{
    public static class ProductSubCategoryBuilder
    {
        public static ProductSubCategoryDto Build(ProductSubCategoryDb db)
        {
            return db != null
                ? new ProductSubCategoryDto()
                {
                    Id = db.Id,
                    Title = db.Title,
                    Created = db.Created,
                    Updated = db.Updated
                }
                : null;
        }

        public static ProductSubCategoryDb Build(ProductSubCategoryDto db)
        {
            return db != null
                ? new ProductSubCategoryDb()
                {
                    Id = db.Id,
                    Title = db.Title,
                    Created = db.Created,
                    Updated = db.Updated
                }
                : null;
        }
        public static IQueryable<ProductSubCategoryDb> Build(IQueryable<ProductSubCategoryDto> dbs)
        {
            return dbs?.Select(db => Build(db));
        }

        public static IQueryable<ProductSubCategoryDto> Build(IEnumerable<ProductSubCategoryDb> dbs)
        {
            return dbs?.Select(db => Build(db)).AsQueryable();
        }
    }
}
