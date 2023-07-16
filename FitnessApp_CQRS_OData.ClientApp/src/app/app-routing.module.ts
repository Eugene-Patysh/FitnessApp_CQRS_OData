import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './general/components/home/home.component';
import { ProductCategoryListComponent } from './products/components/category/product-category-list/product-category-list.component';
import { ProductCategoryViewComponent } from './products/components/category/product-category-view/product-category-view.component';
import { ProductSubcategoryListComponent } from './products/components/subcategory/product-subcategory-list/product-subcategory-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'food', children: [
    { path: 'category/list', component: ProductCategoryListComponent },
    { path: 'category/view/:id', component: ProductCategoryViewComponent },
    { path: 'subcategory/list', component: ProductSubcategoryListComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
