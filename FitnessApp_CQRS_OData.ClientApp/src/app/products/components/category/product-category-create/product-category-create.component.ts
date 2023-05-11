import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductCategory } from 'app/products/models/product-category';
import { ProductService } from 'app/products/services/product.service';

@Component({
  selector: 'app-product-category-create',
  templateUrl: './product-category-create.component.html',
  styleUrls: ['./product-category-create.component.css']
})
export class ProductCategoryCreateComponent {

  constructor(public dialogRef: MatDialogRef<ProductCategoryCreateComponent>,
             @Inject(MAT_DIALOG_DATA) public data: ProductCategory = {},
             private productService: ProductService) { }


  onNoClick(): void {
    this.dialogRef.close();
  }

  onCreateClick(): void {
    if (this.data.id) {
      this.productService.updateProductCategory(this.data).subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      this.productService.createProductCategory(this.data).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }

}
