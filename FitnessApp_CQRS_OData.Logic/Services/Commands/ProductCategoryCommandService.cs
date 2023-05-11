using FitnessApp_CQRS_OData.Data_EF;
using FitnessApp_CQRS_OData.Data_EF.Models;
using FitnessApp_CQRS_OData.Logic.Builders;
using FitnessApp_CQRS_OData.Logic.Models;
using FitnessApp_CQRS_OData.Logic.Models.Commands;
using FitnessApp_CQRS_OData.Logic.Validators;
using MediatR;

namespace FitnessApp_CQRS_OData.Logic.Services.Commands
{
    public class ProductCategoryCommandService : BaseService,
        IRequestHandler<ProductCategoryCreateCommand, int>,
        IRequestHandler<ProductCategoryUpdateCommand, int>,
        IRequestHandler<ProductCategoryDeleteCommand, bool>
    {
        private readonly ICustomValidator<ProductCategoryDto> _validator;

        public ProductCategoryCommandService(ProductContext context, ICustomValidator<ProductCategoryDto> validator) : base(context)
        {
            _validator = validator;
        }

        public async Task<int> Handle(ProductCategoryCreateCommand request, CancellationToken cancellationToken)
        {
            var productCategoryDb = ProductCategoryBuilder.Build(request);

            _context.ProductCategories.Add(productCategoryDb);

            await _context.SaveChangesAsync(cancellationToken);

            return productCategoryDb.Id.Value;
        }

        public async Task<int> Handle(ProductCategoryUpdateCommand request, CancellationToken cancellationToken)
        {
            var productCategoryDb = ProductCategoryBuilder.Build(request);

            //_validator.Validate(productCategoryDto, "AddProductCategory");

            _context.ProductCategories.Update(productCategoryDb);

            await _context.SaveChangesAsync(cancellationToken);

            return productCategoryDb.Id.Value;
        }

        public async Task<bool> Handle(ProductCategoryDeleteCommand request, CancellationToken cancellationToken)
        {
            var productCategoryDb = _context.ProductCategories.FirstOrDefault(c => c.Id == request.Id);
            _context.ProductCategories.Remove(productCategoryDb);

            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }
    }
}
