using FitnessApp_CQRS_OData.Data_EF.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp_CQRS_OData.Data_EF
{
    internal static class ModelBuilderExtension
    {
        // Extension methods for ModelBuilder
        internal static void SeedData(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TreatingTypeDb>()
                .HasData(
                    new TreatingTypeDb
                    {
                        Id = 1,
                        Title = "fresh"
                    },
                    new TreatingTypeDb
                    {
                        Id = 2,
                        Title = "fried"
                    }
                );
        }
    }
}
