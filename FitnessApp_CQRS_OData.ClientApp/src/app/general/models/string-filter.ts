import { FilterOperator, ODataFilter } from "./filter";

/**
 * OData Filter on a String field.
 */
export class ODataStringFilter implements ODataFilter {

  /**
   * Field to apply the Filter on.
   */
  field: string;

  /**
   * Operator to filter for.
   */
  operator: FilterOperator;

  /**
   * The Value to filter.
   */
  value: string | null;

  /**
   * Constructs a new ``StringFilter``.
   *
   * @param field - Field to apply the Filter on.
   * @param operator - Operator to filter for, such as "IsNull", "StartsWith", ...
   * @param value - The Value to filter for.
   */
  constructor(field: string, operator: FilterOperator, value: string | null) {
      this.field = field;
      this.operator = operator;
      this.value = value;
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
          case FilterOperator.IsEqualTo:
              return `${this.field}  eq '${this.value}'`;
          case FilterOperator.IsNotEqualTo:
              return `${this.field} neq '${this.value}'`;
          case FilterOperator.IsEmpty:
              return `(${this.field} eq null) or (${this.field} eq '')`
          case FilterOperator.IsNotEmpty:
              return `(${this.field} ne null) and (${this.field} ne '')`
          case FilterOperator.Contains:
              return `contains(${this.field}, '${this.value}')`;
          case FilterOperator.NotContains:
              return `indexof(${this.field}, '${this.value}') eq -1`;
          case FilterOperator.StartsWith:
              return `startswith(${this.field}, '${this.value}')`;
          case FilterOperator.EndsWith:
              return `endswith(${this.field}, '${this.value}')`;
          default:
              throw new Error(`${this.operator} is not supported`);
      }
  }
}
