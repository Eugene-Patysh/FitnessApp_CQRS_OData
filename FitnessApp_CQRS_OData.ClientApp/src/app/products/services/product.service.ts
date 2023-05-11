import { ProductCategory } from './../models/product-category';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/general/services/api.service';
import { map, Observable } from 'rxjs';
import { DatagridState } from 'app/general/models/datagrid-state';
import { ODataUtils } from 'app/general/utils/odata-utils';
import { ProductSubCategory } from '../models/product-subcategory';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends ApiService {

  // Product Category
  public getProductCategories(state: DatagridState): Observable<ProductCategory[]> {
    const query = ODataUtils.asODataString(`ProductCategory`, state, { });
    return this.get<ProductCategory[]>(query);
  }

  public getProductCategoryById(id: number): Observable<ProductCategory> {
    // const query = ODataUtils.asODataStringId(`ProductCategory/${id}`, { $expand: 'productSubCategories'});
    return this.get<ProductCategory>(`ProductCategory/${id}`).pipe(map((response: any) => response[0]));
  }

  public createProductCategory(request: ProductCategory): Observable<string> {
    return this.post<string>(`ProductCategoryCommands/create`, request);
  }

  public updateProductCategory(request: ProductCategory): Observable<string> {
    return this.put<string>(`ProductCategoryCommands/update`, request);
  }

  public deleteProductCategory(request: ProductCategory): Observable<string> {
    return this.delete<string>(`ProductCategoryCommands/delete`, request);
  }

  // Product Subcategory

  public getProductSubcategories(state: DatagridState): Observable<ProductSubCategory[]> {
    const query = ODataUtils.asODataString(`ProductSubcategory`, state, { });
    return this.get<ProductSubCategory[]>(query);
  }
}
