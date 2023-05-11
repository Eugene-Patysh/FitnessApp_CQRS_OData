export enum FilterType {
  NumericFilter = "numericFilter",
  StringFilter = "stringFilter",
  DateFilter = "dateFilter",
  BooleanFilter = "booleanFilter",
}

export enum FilterOperator {
  None = "none",
  Before = "before",
  After = "after",
  IsEqualTo = "isEqualTo",
  IsNotEqualTo = "isNotEqualTo",
  Contains = "contains",
  NotContains = "notContains",
  StartsWith = "startsWith",
  EndsWith = "endsWith",
  IsNull = "isNull",
  IsNotNull = "isNotNull",
  IsEmpty = "isEmpty",
  IsNotEmpty = "isNotEmpty",
  IsGreaterThanOrEqualTo = "isGreaterThanOrEqualTo",
  IsGreaterThan = "isGreaterThan",
  IsLessThanOrEqualTo = "isLessThanOrEqualTo",
  IsLessThan = "isLessThan",
  BetweenInclusive = "betweenInclusive",
  BetweenExclusive = "betweenExclusive",
  Yes = "yes",
  No = "no",
  All = "all"
}

export class DropdownOption {
  public text: string;
  public id: FilterOperator;

  constructor(id: FilterOperator, text: string) {
    this.text = text;
    this.id = id;
  }
}

export interface ColumnFilter {

  /**
   * Field to apply the Filter on.
   */
  field: string;

  /**
   * Filter operator, such as "IsNull", "StartsWith", ...
   */
  filterOperator: FilterOperator;

  /**
   * Applies the Filter.
   */
  applyFilter(): void;

  /**
   * Resets the Filter.
   */
  resetFilter(): void;

  /**
   * Returns the OData Filter.
   */
  toODataFilter(): ODataFilter;
}

/**
 * Every OData Filter is applied to a field and provides a way to serialize itself into the OData Format.
 */
export interface ODataFilter {

  /**
   * Field to apply the Filter on.
   */
  field: string;

  /**
   * The Filter operator, such as "IsNull", "StartsWith", ...
   */
  operator: FilterOperator;

  /**
   * Serializes the ODataFilter as a string.
   */
  toODataString(): string | null;
}

