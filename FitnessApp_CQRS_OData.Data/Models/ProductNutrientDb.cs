﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FitnessApp_CQRS_OData.Data_EF.Models
{
    public class ProductNutrientDb
    {
        public int? Id { get; set; }
        public double Quality { get; set; }
        public ProductDb Product { get; set; }
        public int? ProductId { get; set; }
        public NutrientDb Nutrient { get; set; }
        public int? NutrientId { get; set; }
        public TreatingTypeDb TreatingType { get; set; }
        public int? TreatingTypeId { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
    }
}
