using FitnessApp_CQRS_OData.Data_EF.Configurations;
using FitnessApp_CQRS_OData.Data_EF.Models;
using Microsoft.EntityFrameworkCore;

namespace FitnessApp_CQRS_OData.Data_EF
{
    public class ProductContext: DbContext
    {
        public ProductContext(DbContextOptions<ProductContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<TreatingTypeDb> TreatingTypes { get; set; }
        public DbSet<ProductCategoryDb> ProductCategories { get; set; }
        public DbSet<ProductSubCategoryDb> ProductSubCategories { get; set; }
        public DbSet<ProductDb> Products { get; set; }
        public DbSet<NutrientCategoryDb> NutrientCategories { get; set; }
        public DbSet<NutrientDb> Nutrients { get; set; }
        public DbSet<ProductNutrientDb> ProductNutrients { get; set; }

        // Override OnModelCreating of DbContext for Custom Model Configuration
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new TreatingTypeConfiguration()); // use custom model configuration
            modelBuilder.ApplyConfiguration(new NutrientCategoryConfiguration());
            modelBuilder.ApplyConfiguration(new NutrientConfiguration());
            modelBuilder.ApplyConfiguration(new ProductCategoryConfiguration());
            modelBuilder.ApplyConfiguration(new ProductSubCategoryConfiguration());
            modelBuilder.ApplyConfiguration(new ProductConfiguration());
            modelBuilder.ApplyConfiguration(new ProductNutrientConfiguration());

            //modelBuilder.SeedData(); // add default data
        }
    }
}