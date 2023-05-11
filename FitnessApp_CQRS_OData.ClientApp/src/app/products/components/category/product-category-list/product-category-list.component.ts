import { DateRangeFilterComponent } from './../../../../general/components/date-range-filter/date-range-filter.component';
import { ProductCategory } from './../../../models/product-category';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ProductService } from 'app/products/services/product.service';
import { DatagridState } from 'app/general/models/datagrid-state';
import { StringFilterComponent } from 'app/general/components/string-filter/string-filter.component';
import { NumberFilterComponent } from 'app/general/components/number-filter/number-filter.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductCategoryCreateComponent } from '../product-category-create/product-category-create.component';
import { ProductCategoryDeleteComponent } from '../product-category-delete/product-category-delete.component';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.css']
})
export class ProductCategoryListComponent implements OnInit {

  @ViewChild('title') title?: StringFilterComponent;
  @ViewChild('subCategoriesCount') subCategoriesCount?: NumberFilterComponent;
  @ViewChild('created') created?: DateRangeFilterComponent;
  @ViewChild('updated') updated?: DateRangeFilterComponent;

  displayedColumns: string[] = ['id', 'title', 'subCategoriesCount', 'created',  'updated', 'btns'];
  data: ProductCategory[] = [];
  total = 0;
  tableState: DatagridState = new DatagridState();
  previousPageSize = 10;

  constructor(public dialog: MatDialog,
              private productService: ProductService) {}

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    this.productService.getProductCategories(this.tableState).subscribe((data: ProductCategory[]) => {
      this.data = data;
      this.total = data.length;
    });
  }

  addData(): void {
    const category = new ProductCategory();
    const dialogRef = this.dialog.open(ProductCategoryCreateComponent, {
      data: category,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getData();
    });
  }

  edit(productCategory: ProductCategory): void {
    const category = new ProductCategory();
    category.id = productCategory.id;
    category.title = productCategory.title;

    const dialogRef = this.dialog.open(ProductCategoryCreateComponent, {
      data: category,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getData();
    });
  }

  delete(productCategory: ProductCategory): void {
    const category = new ProductCategory();
    category.id = productCategory.id;
    category.title = productCategory.title;

    const dialogRef = this.dialog.open(ProductCategoryDeleteComponent, {
      data: category,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getData();
    });
  }

  sortData(sort: Sort) {
    this.tableState.sort = {
      by: sort.active,
      reverse: sort.direction === 'desc'
    }
    this.getData();
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

  onFilterChanged(): void {
    if (this.title) {
      const indexToUpdate = this.tableState.filters?.findIndex(item => item.field === this.title?.field);
      if (indexToUpdate === -1) {
        this.tableState.filters?.push(this.title);
      } else {
        this.tableState.filters[indexToUpdate] = this.title;
      }
    }

    if (this.subCategoriesCount) {
      const indexToUpdate = this.tableState.filters?.findIndex(item => item.field === this.subCategoriesCount?.field);
      if (indexToUpdate === -1) {
        this.tableState.filters?.push(this.subCategoriesCount);
      } else {
        this.tableState.filters[indexToUpdate] = this.subCategoriesCount;
      }
    }

    if (this.created) {
      const indexToUpdate = this.tableState.filters?.findIndex(item => item.field === this.created?.field);
      if (indexToUpdate === -1) {
        this.tableState.filters?.push(this.created);
      } else {
        this.tableState.filters[indexToUpdate] = this.created;
      }
    }

    if (this.updated) {
      const indexToUpdate = this.tableState.filters?.findIndex(item => item.field === this.updated?.field);
      if (indexToUpdate === -1) {
        this.tableState.filters?.push(this.updated);
      } else {
        this.tableState.filters[indexToUpdate] = this.updated;
      }
    }

    this.getData();
  }

}
