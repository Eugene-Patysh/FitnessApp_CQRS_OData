using MediatR;

namespace FitnessApp_CQRS_OData.Logic.Models.Commands
{
    public class ProductCategoryCreateCommand : IRequest<int>
    {
        public string Title { get; set; }
    }

    public class ProductCategoryUpdateCommand : IRequest<int>
    {
        public int? Id { get; set; }
        public string Title { get; set; }
    }

    public class ProductCategoryDeleteCommand : IRequest<bool>
    {
        public int? Id { get; set; }
    }
}
