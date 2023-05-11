import { FilterOperator, ODataFilter } from "./filter";

/**
 *  A Filter for numeric values and range queries.
 */
export class ODataNumericFilter implements ODataFilter {

  /**
   * The field to apply the filter on.
   */
  readonly field: string;

  /**
   * The filter operator to apply, such as "IsNull", "LessThan", ...
   */
  readonly operator: FilterOperator;

  /**
   * Lower Bound for range queries.
   */
  readonly low: number | null;

  /**
   * Upper Bound for Range Queries.
   */
  readonly high: number | null;

  /**
   *
   * @param field - The field to apply the filter on.
   * @param operator - The filter operator to apply, such as "IsNull", "LessThan", ...
   * @param low - Lower Bound for range queries.
   * @param high - Upper Bound for Range Queries.
   */
  constructor(field: string, operator: FilterOperator, low: number | null, high: number | null) {
      this.field = field;
      this.operator = operator;
      this.low = low;
      this.high = high;
  }

  /**
   * Converts this Filter to an OData string.
   *
   * @returns OData filter string for the field.
   */
  toODataString(): string | null {

      if (this.operator == FilterOperator.None) {
          return null;
      }

      switch (this.operator) {
          case FilterOperator.IsNull:
              return `${this.field} eq null`;
          case FilterOperator.IsNotNull:
              return `${this.field} ne null`;
          case FilterOperator.IsGreaterThan:
              return `${this.field} gt ${this.low}`;
          case FilterOperator.IsGreaterThanOrEqualTo:
              return `${this.field} ge ${this.low}`;
          case FilterOperator.IsLessThan:
              return `${this.field} lt ${this.low}`;
          case FilterOperator.IsLessThan:
              return `${this.field} le ${this.low}`;
          case FilterOperator.BetweenExclusive:
              return `(${this.field} gt ${this.low}) and (${this.field} lt ${this.high})`;
          case FilterOperator.BetweenInclusive:
              return `(${this.field} ge ${this.low}) and (${this.field} le ${this.high})`;
          default:
              return null;
      }
  }
}
