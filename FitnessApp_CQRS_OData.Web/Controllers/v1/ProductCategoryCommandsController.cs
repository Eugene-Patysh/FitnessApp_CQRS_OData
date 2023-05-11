using FitnessApp_CQRS_OData.Logic.Models;
using FitnessApp_CQRS_OData.Logic.Models.Commands;
using FitnessApp_CQRS_OData.Web.SwaggerExamples;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.IIS.Core;
using Swashbuckle.AspNetCore.Filters;
using System.ComponentModel.DataAnnotations;

namespace FitnessApp_CQRS_OData.Web.Controllers.v1
{
    /// <summary>
    /// ProductCategory Commands Controller
    /// </summary>
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiController]
    [ApiVersion("1.0")]
    public class ProductCategoryCommandsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ProductCategoryCommandsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// Creates new product category
        /// </summary>
        /// <remarks>Title must be alphabetic characters with a maximum length of 30 characters</remarks>
        /// <param name="request"></param>
        /// <returns>Returns the id of the created product category if successful</returns>
        /// <response code="200">Successful product category creation</response>
        /// <response code="400">Some fields have incorrect values</response>
        /// <response code="500">Internal server error</response>
        [HttpPost("create")]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        //[SwaggerRequestExample(typeof(ProductCategoryCreateCommand), typeof(ProductCategoryCreateExample))]
        public async Task<int> Create(ProductCategoryCreateCommand request)
        {
            var productCategoryId = await _mediator.Send(request);

            return productCategoryId;
        }

        /// <summary>
        /// Updates existing product category
        /// </summary>
        /// <remarks>Title must be alphabetic characters with a maximum length of 30 characters</remarks>
        /// <param name="request"></param>
        /// <returns>Returns the id of the updated product category if successful</returns>
        /// <response code="200">Successful product category updation</response>
        /// <response code="400">Some fields have incorrect values</response>
        /// <response code="500">Internal server error</response>
        [HttpPut("update")]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        //[SwaggerRequestExample(typeof(ProductCategoryUpdateCommand), typeof(ProductCategoryUpdateExample))]
        public async Task<int> Update(ProductCategoryUpdateCommand request)
        {
            var productCategoryId = await _mediator.Send(request);

            return productCategoryId;
        }

        /// <summary>
        /// Removes product category
        /// </summary>
        /// <remarks>Title must be alphabetic characters with a maximum length of 30 characters</remarks>
        /// <param name="request"></param>
        /// <returns>Returns success/fail status</returns>
        /// <response code="200">Successful product category updation</response>
        /// <response code="400">Some fields have incorrect values</response>
        /// <response code="500">Internal server error</response>
        [HttpDelete("delete")]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<bool> Delete(ProductCategoryDeleteCommand request)
        {
            var deleted = await _mediator.Send(request);

            return deleted;
        }
    }
}
