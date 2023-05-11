import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductCategory } from 'app/products/models/product-category';
import { ProductService } from 'app/products/services/product.service';

@Component({
  selector: 'app-product-category-delete',
  templateUrl: './product-category-delete.component.html',
  styleUrls: ['./product-category-delete.component.scss']
})
export class ProductCategoryDeleteComponent {

  constructor(public dialogRef: MatDialogRef<ProductCategoryDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ProductCategory,
              private productService: ProductService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick(): void {
    if (this.data) {
      this.productService.deleteProductCategory(this.data).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }
}
