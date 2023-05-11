using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp_CQRS_OData.Logic.Models
{
    public class ProductCategoryDto
    {
        public int? Id { get; set; }
        public string Title { get; set; }
        public int SubCategoriesCount { get; set; }
        public virtual IQueryable<ProductSubCategoryDto> ProductSubCategories { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
    }
}
