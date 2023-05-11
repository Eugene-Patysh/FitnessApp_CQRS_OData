import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralModule } from 'app/general/general.module';
import { ProductCategoryListComponent } from './components/category/product-category-list/product-category-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { ProductCategoryViewComponent } from './components/category/product-category-view/product-category-view.component';
import { ProductCategoryCreateComponent } from './components/category/product-category-create/product-category-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCategoryDeleteComponent } from './components/category/product-category-delete/product-category-delete.component';
import { ProductSubcategoryListComponent } from './components/subcategory/product-subcategory-list/product-subcategory-list.component';

@NgModule({
  imports: [
    CommonModule,
    GeneralModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProductCategoryListComponent,
    ProductCategoryViewComponent,
    ProductCategoryCreateComponent,
    ProductCategoryDeleteComponent,
    ProductSubcategoryListComponent
  ]
})
export class ProductsModule { }
