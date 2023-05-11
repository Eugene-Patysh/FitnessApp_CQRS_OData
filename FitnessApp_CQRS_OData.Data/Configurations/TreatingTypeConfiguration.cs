using FitnessApp_CQRS_OData.Data_EF.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FitnessApp_CQRS_OData.Data_EF.Configurations
{
    internal class TreatingTypeConfiguration : IEntityTypeConfiguration<TreatingTypeDb>
    {
        public void Configure(EntityTypeBuilder<TreatingTypeDb> builder)
        {
            builder.ToTable("TreatingTypes").HasKey(t => t.Id); // configure table name and set primary key
            builder.Property(_ => _.Id).ValueGeneratedOnAdd(); // auto creating id when entity is added
            builder.Property(_ => _.Title).IsRequired().HasMaxLength(20); // required field with 30 symbols max length
        }
    }
}
