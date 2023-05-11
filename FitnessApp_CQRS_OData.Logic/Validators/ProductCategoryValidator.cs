using FitnessApp_CQRS_OData.Logic.Models;
using FitnessApp_CQRS_OData.Logic.Models.Commands;
using FluentValidation;

namespace FitnessApp_CQRS_OData.Logic.Validators
{
    public class ProductCategoryValidator : AbstractValidator<ProductCategoryDto>
    {
        public ProductCategoryValidator()
        {
            //ClassLevelCascadeMode = CascadeMode.Stop;

            RuleFor(o => o).NotNull().WithMessage("Object can not be null.");

            RuleFor(o => o.Title)
                .Must(t => !string.IsNullOrEmpty(t)).WithMessage("Product category title can't be null.")
                .MaximumLength(30).WithMessage("Length of product category title can't be more than 30 symbols.");

            RuleSet("AddProductCategory", () =>
            {
                RuleFor(o => o.Id).Null().WithMessage("Product category Id should be null.");
            });

            RuleSet("UpdateProductCategory", () =>
            {
                RuleFor(o => o.Id).NotNull().WithMessage("Product category Id can't be null.");
            });
        }
    }

    public class CreateProductCategoryCommandValidator : AbstractValidator<ProductCategoryCreateCommand>
    {
        public CreateProductCategoryCommandValidator()
        {
            RuleFor(o => o.Title)
                .Must(t => !string.IsNullOrEmpty(t)).WithMessage("Product category title can't be null.")
                .MaximumLength(30).WithMessage("Length of product category title can't be more than 30 symbols.");
        }
    }

    public class UpdateProductCategoryCommandValidator : AbstractValidator<ProductCategoryUpdateCommand>
    {
        public UpdateProductCategoryCommandValidator()
        {
            RuleFor(o => o.Id).NotNull().WithMessage("Product category Id can't be null.");

            RuleFor(o => o.Title)
                .Must(t => !string.IsNullOrEmpty(t)).WithMessage("Product category title can't be null.")
                .MaximumLength(30).WithMessage("Length of product category title can't be more than 30 symbols.");
        }
    }

    public class DeleteProductCategoryCommandValidator : AbstractValidator<ProductCategoryDeleteCommand>
    {
        public DeleteProductCategoryCommandValidator()
        {
            RuleFor(o => o.Id).NotNull().WithMessage("Product category Id can't be null.");
        }
    }
}
