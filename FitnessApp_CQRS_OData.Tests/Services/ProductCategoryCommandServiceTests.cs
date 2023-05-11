using FitnessApp_CQRS_OData.Data_EF;
using FitnessApp_CQRS_OData.Logic.Models;
using FitnessApp_CQRS_OData.Logic.Models.Commands;
using FitnessApp_CQRS_OData.Logic.Services.Commands;
using FitnessApp_CQRS_OData.Logic.Validators;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace FitnessApp_CQRS_OData.Tests.Services
{
    public class ProductCategoryCommandServiceTests
    {
        private readonly ProductCategoryCommandService _productCategoryService;
        private readonly ProductContext _productContext;
        public ProductCategoryCommandServiceTests()
        {
            var productCategoryValidator = new ProductCategoryValidator();
            var validator = new CustomValidator<ProductCategoryDto>(productCategoryValidator);
            _productContext = CreateDbContext();
            _productCategoryService = new ProductCategoryCommandService(_productContext, validator);
        }

        private ProductContext CreateDbContext()
        {
            var options = new DbContextOptionsBuilder<ProductContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N")).Options;
            var dbContext = new ProductContext(options);
            return dbContext;
        }

        [Fact]
        public async Task CreateAsync_HappyCase()
        {
            var productCategory = new ProductCategoryCreateCommand() { Title = "Meat" };

            var categoryId = await _productCategoryService.Handle(productCategory, default);

            var categories = _productContext.ProductCategories.ToList();
            var createdCategory = categories.FirstOrDefault(c => c.Title == "Meat");

            Assert.NotNull(createdCategory);
            Assert.NotNull(createdCategory?.Id);
        }
    }
}
