import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { DatagridState } from 'app/general/models/datagrid-state';
import { ProductSubCategory } from 'app/products/models/product-subcategory';
import { ProductService } from 'app/products/services/product.service';

@Component({
  selector: 'app-product-subcategory-list',
  templateUrl: './product-subcategory-list.component.html',
  styleUrls: ['./product-subcategory-list.component.css']
})
export class ProductSubcategoryListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'created',  'updated', 'btns'];
  data: ProductSubCategory[] = [];
  total = 0;
  tableState: DatagridState = new DatagridState();
  previousPageSize = 10;

  constructor(public dialog: MatDialog,
    private productService: ProductService) {}

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    this.productService.getProductSubcategories(this.tableState).subscribe((data: ProductSubCategory[]) => {
      this.data = data;
      this.total = data.length;
    });
  }

  addData(): void {
    // const category = new ProductCategory();
    // const dialogRef = this.dialog.open(ProductCategoryCreateComponent, {
    //   data: category,
    // });
    // dialogRef.afterClosed().subscribe(() => {
    //   this.getData();
    // });
  }

  edit(productCategory: ProductSubCategory): void {
    // const category = new ProductSubCategory();
    // category.id = productCategory.id;
    // category.title = productCategory.title;

    // const dialogRef = this.dialog.open(ProductCategoryCreateComponent, {
    //   data: category,
    // });

    // dialogRef.afterClosed().subscribe(() => {
    //   this.getData();
    // });
  }

  delete(productCategory: ProductSubCategory): void {
    // const category = new ProductSubCategory();
    // category.id = productCategory.id;
    // category.title = productCategory.title;

    // const dialogRef = this.dialog.open(ProductCategoryDeleteComponent, {
    //   data: category,
    // });

    // dialogRef.afterClosed().subscribe(() => {
    //   this.getData();
    // });
  }

  handlePageEvent(e: PageEvent) {
    this.previousPageSize = e.pageSize;
    this.tableState.page = {
      from: this.previousPageSize === e.pageSize ? (e.pageIndex * e.pageSize + 1) : 0,
      to: this.previousPageSize === e.pageSize ? (e.pageIndex * e.pageSize + e.pageSize): this.previousPageSize - 1,
      size: e.pageSize
    }
    this.getData();
  }

  sortData(sort: Sort) {
    this.tableState.sort = {
      by: sort.active,
      reverse: sort.direction === 'desc'
    }
    this.getData();
  }

}
