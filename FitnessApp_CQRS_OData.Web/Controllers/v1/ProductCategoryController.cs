using FitnessApp_CQRS_OData.Logic.Models;
using FitnessApp_CQRS_OData.Logic.Services.Queries;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OData.Formatter;
using Microsoft.AspNetCore.OData.Query;
using Microsoft.AspNetCore.OData.Routing.Controllers;

namespace FitnessApp_CQRS_OData.Web.Controllers.v1
{
    /// <summary>
    /// ProductCategory Queries Controller
    /// </summary>
    [ApiController]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiVersion("1.0")]
    public class ProductCategoryController : ODataController
    {
        private readonly IProductCategoryQueryService _productCategoryService;

        public ProductCategoryController(IProductCategoryQueryService productCategoryService)
        {
            _productCategoryService = productCategoryService;
        }

        /// <summary>
        /// Gets product categories query
        /// </summary>
        /// <remarks>Available select, sort, filter, pagination query</remarks>
        /// <returns></returns>
        [HttpGet]
        [EnableQuery(PageSize = 10)]
        public IQueryable<ProductCategoryDto> Get()
        {
            return _productCategoryService.Get();
        }

        /// <summary>
        /// Gets product category by Id
        /// </summary>
        /// <remarks>Id must be integer type</remarks>
        /// <param name="productCategoryId"></param>
        /// <returns></returns>
        [HttpGet("{productCategoryId}")]
        [EnableQuery]
        public IQueryable<ProductCategoryDto> Get([FromODataUri] int? productCategoryId)
        {
            if (productCategoryId == null)
                BadRequest();

            return _productCategoryService.GetById(productCategoryId);
        }
    }
}
