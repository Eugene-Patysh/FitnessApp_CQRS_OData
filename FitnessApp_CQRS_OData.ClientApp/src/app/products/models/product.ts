import { ProductSubCategory } from "./product-subcategory";

export interface Product {
  id?: number;
  title: string;
  productSubCategory?: ProductSubCategory;
  // productNutrients?: number;
  created: Date;
  updated: Date;
}
