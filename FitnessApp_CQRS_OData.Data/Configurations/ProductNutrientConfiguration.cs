using FitnessApp_CQRS_OData.Data_EF.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace FitnessApp_CQRS_OData.Data_EF.Configurations
{
    internal class ProductNutrientConfiguration : IEntityTypeConfiguration<ProductNutrientDb>
    {
        public void Configure(EntityTypeBuilder<ProductNutrientDb> builder)
        {
            builder.ToTable("ProductNutrients").HasKey(t => t.Id); // configure table name and set primary key
            builder.Property(_ => _.Id).ValueGeneratedOnAdd(); // auto creating id when entity is added
            builder.HasOne(_ => _.Product).WithMany(_ => _.ProductNutrients).HasForeignKey(_ => _.ProductId);
            builder.HasOne(_ => _.TreatingType).WithMany(_ => _.ProductNutrients).HasForeignKey(_ => _.TreatingTypeId);
            builder.HasOne(_ => _.Nutrient).WithMany(_ => _.ProductNutrients).HasForeignKey(_ => _.NutrientId);
        }
    }
}
