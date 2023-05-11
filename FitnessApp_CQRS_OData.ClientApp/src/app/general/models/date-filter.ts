import { FilterOperator, ODataFilter } from "./filter";

export class ODataDateFilter implements ODataFilter {

  /**
   * The field to apply the filter on.
   */
  readonly field: string;

  /**
   * The filter operator to apply, such as "IsNull", "StartsWith", ...
   */
  readonly operator: FilterOperator;

  /**
   * The start date for a range query.
   */
  readonly startDate: Date | null;

  /**
   * The end date for a range query.
   */
  readonly endDate: Date | null;

  /**
   * Builds a new Date Filter.
   *
   * @param field - The field to apply the filter on.
   * @param operator - The filter operator to apply, such as "IsNull", "StartsWith", ...
   * @param startDate - The start date for a range query.
   * @param endDate - The end date for a range query.
   */
  constructor(field: string, operator: FilterOperator, startDate: Date | null, endDate: Date | null) {
      this.field = field;
      this.operator = operator;
      this.startDate = startDate;
      this.endDate = endDate;
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

      const startDate = this.toODataDateTime(this.startDate);
      const endDate = this.toODataDateTime(this.endDate);

      switch (this.operator) {
          case FilterOperator.IsNull:
              return `${this.field} eq null`;
          case FilterOperator.IsNotNull:
              return `${this.field} ne null`;
          case FilterOperator.IsEqualTo:
              return `${this.field}  eq ${startDate}`;
          case FilterOperator.IsNotEqualTo:
              return `${this.field}  neq ${startDate}`;
          case FilterOperator.After:
          case FilterOperator.IsGreaterThan:
              return `${this.field} gt ${startDate}`;
          case FilterOperator.IsGreaterThanOrEqualTo:
              return `${this.field} ge ${startDate}`;
          case FilterOperator.Before:
          case FilterOperator.IsLessThan:
              return `${this.field} lt ${startDate}`;
          case FilterOperator.IsLessThanOrEqualTo:
              return `${this.field} le ${startDate}`;
          case FilterOperator.BetweenExclusive:
              return `(${this.field} gt ${startDate}) and (${this.field} lt ${endDate})`;
          case FilterOperator.BetweenInclusive:
              return `(${this.field} ge ${startDate}) and (${this.field} le ${endDate})`;
          default:
              throw new Error(`${this.operator} is not supported`);
      }
  }

  /**
   * Converts the ``ZonedDateTime`` into an OData-compatible string. OData needs
   * Dates to be formatted in UTC (Zulu) ISO format.
   *
   * @param zonedDateTime - The ``ZonedDateTime`` to filter for.
   * @returns OData representation for the ``ZonedDateTime``
   */
  toODataDateTime(jsonDate: Date | null): string | null {
    return jsonDate ? jsonDate.toISOString() : null;
  }
}
