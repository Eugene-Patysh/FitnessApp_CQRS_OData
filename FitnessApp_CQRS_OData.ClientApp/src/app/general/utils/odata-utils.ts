import { HttpParams } from "@angular/common/http";
import { DatagridState } from "../models/datagrid-state";
import { ColumnFilter, ODataFilter } from "../models/filter";
import { StringUtils } from "./string-utils";
import { HttpQueryParamType } from "./type-util";

export class ODataUtils {

   public static asODataString(endpoint: string, state: DatagridState, params: Partial<{ $select?: string, $expand?: string }>): string {

      const httpQueryParameters: HttpQueryParamType = {
          ...this.getSelectParameter(params.$select),
          ...this.getExpandParameter(params.$expand),
          ...this.toODataFilterStatements(state),
          ...this.getPaginationParameters(state),
          ...this.getSortParameters(state),
          ...{ "$count": true }
      };

      const httpParameters: HttpParams = new HttpParams().appendAll(httpQueryParameters);

      if (StringUtils.isNullOrWhitespace(httpParameters.toString())) {
          return endpoint;
      }

      return `${endpoint}?${httpParameters.toString()}`;
  }

  public static asODataStringId(endpoint: string, params: Partial<{ $select?: string, $expand?: string }>): string {

    const httpQueryParameters: HttpQueryParamType = {
        ...this.getSelectParameter(params.$select),
        ...this.getExpandParameter(params.$expand)
    };

    const httpParameters: HttpParams = new HttpParams().appendAll(httpQueryParameters);

    if (StringUtils.isNullOrWhitespace(httpParameters.toString())) {
        return endpoint;
    }

    return `${endpoint}?${httpParameters.toString()}`;
  }

  private static getSelectParameter(select?: string): HttpQueryParamType {

      if(!select) {
          return {};
      }

      return { "$select": select };
  }

  private static getExpandParameter(expand?: string): HttpQueryParamType {
    if(!expand) {
      return {};
    }

    return { "$expand": expand };
  }

  private static toODataFilterStatements(clrDataGridState: DatagridState): HttpQueryParamType {

      // Get all OData Filters from the Grid:
      const filters: ODataFilter[] = ODataUtils.castToODataFilters(clrDataGridState);

      // Serialize the to OData strings:
      const serializedFilters = ODataUtils.serializeAllFilters(filters);

      if (!serializedFilters) {
          return {};
      }

      return {
          "$filter": serializedFilters
      };
  }

  private static castToODataFilters(clrDataGridState: DatagridState): ODataFilter[] {

      if (!clrDataGridState.filters) {
          return [];
      }

      return clrDataGridState.filters
          .filter(filter => (filter as ColumnFilter).toODataFilter) // Typescript has no "instanceof", so use some duck typing...
          .map(filterProvider => filterProvider.toODataFilter());
  }

  private static serializeAllFilters(filters: ODataFilter[]): string {
      // Serialize the Filters:
      return filters
          // Format as OData string:
          .map((filter) => filter.toODataString())
          // There may be empty OData-strings:
          .filter(filter => !StringUtils.isNullOrWhitespace(filter))
          // Wrap it in parentheses, so concatenating filters doesn't lead to problems:
          .map((filter) => `(${filter})`)
          // Concat all Filters with AND:
          .join(' and ');
  }

  private static getSortParameters(clrDataGridFilter: DatagridState): HttpQueryParamType {

      if (!clrDataGridFilter.sort) {
          return {};
      }

      const by: string = clrDataGridFilter.sort.by.toString();

      if (StringUtils.isNullOrWhitespace(by)) {
          return {};
      }

      const result: HttpQueryParamType = {};

      if (clrDataGridFilter.sort.reverse) {
          result["$orderby"] = `${by} desc`;
      } else {
          result["$orderby"] = `${by}`;
      }

      return result;
  }

  private static getPaginationParameters(clrDataGridFilter: DatagridState): HttpQueryParamType {

      const page = clrDataGridFilter.page;

      if (!page) {
          return {};
      }

      const result: HttpQueryParamType = {};

      if (page.size) {
          result["$top"] = page.size;
      }

      if (page.current && page.size) {
          result["$skip"] = (page.current - 1) * page.size;
      }

      return result;
  }
}
