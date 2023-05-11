import { ProductSubCategory } from "./product-subcategory";

export class ProductCategory {
  id?: number;
  title?: string;
  subCategoriesCount?: number;
  productSubCategories?: ProductSubCategory[];
  created?: Date;
  updated?: Date;
}
