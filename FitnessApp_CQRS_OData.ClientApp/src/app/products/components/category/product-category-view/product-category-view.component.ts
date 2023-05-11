import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCategory } from 'app/products/models/product-category';
import { ProductService } from 'app/products/services/product.service';

@Component({
  selector: 'app-product-category-view',
  templateUrl: './product-category-view.component.html',
  styleUrls: ['./product-category-view.component.css']
})
export class ProductCategoryViewComponent implements OnInit {

  productCategory: ProductCategory = {};

  constructor(public route: ActivatedRoute,
              private productService: ProductService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productCategoryId = params['id'];
      if (productCategoryId) {
        this.getProductCategory(productCategoryId);
      }
    });
  }

  getProductCategory(id: number): void {
    this.productService.getProductCategoryById(id).subscribe((data: ProductCategory) => {
      this.productCategory = data;
      console.log(this.productCategory);
    });
  }
}
