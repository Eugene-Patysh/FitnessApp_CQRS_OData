using FitnessApp_CQRS_OData.Data_EF.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FitnessApp_CQRS_OData.Data_EF.Configurations
{
    internal class ProductConfiguration : IEntityTypeConfiguration<ProductDb>
    {
        public void Configure(EntityTypeBuilder<ProductDb> builder)
        {
            builder.ToTable("Products").HasKey(t => t.Id); // configure table name and set primary key
            builder.Property(_ => _.Id).ValueGeneratedOnAdd(); // auto creating id when entity is added
            builder.Property(_ => _.Title).IsRequired().HasMaxLength(30); // required field with 30 symbols max length
            builder.HasOne(_ => _.ProductSubCategory).WithMany(_ => _.Products).HasForeignKey(_ => _.ProductSubCategoryId); // set foreign key
        }
    }
}
