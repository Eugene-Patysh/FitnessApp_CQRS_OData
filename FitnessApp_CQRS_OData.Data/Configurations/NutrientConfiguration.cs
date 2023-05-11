﻿using FitnessApp_CQRS_OData.Data_EF.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace FitnessApp_CQRS_OData.Data_EF.Configurations
{
    internal class NutrientConfiguration : IEntityTypeConfiguration<NutrientDb>
    {
        public void Configure(EntityTypeBuilder<NutrientDb> builder)
        {
            builder.ToTable("Nutrients").HasKey(t => t.Id); // configure table name and set primary key
            builder.Property(_ => _.Id).ValueGeneratedOnAdd(); // auto creating id when entity is added
            builder.Property(_ => _.Title).IsRequired().HasMaxLength(30); // field to require for fill. Set numbers of max symbols
            builder.HasOne(_ => _.NutrientCategory).WithMany(_ => _.Nutrients).HasForeignKey(_ => _.NutrientCategoryId);
        }
    }
}
