import { Component, Input, Output } from '@angular/core';
import { ColumnFilter, DropdownOption, FilterOperator, ODataFilter } from 'app/general/models/filter';
import { ODataNumericFilter } from 'app/general/models/number-filter';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-number-filter',
  templateUrl: './number-filter.component.html',
  styleUrls: ['./number-filter.component.css']
})
export class NumberFilterComponent implements ColumnFilter {

  @Input() label!: string;
  @Input() field!: string;
  @Input() filterOperator: FilterOperator = FilterOperator.None;
  @Input() low: number | null = null;
  @Input() high: number | null = null;
  @Output() changes = new Subject<any>();

  get isNumericRangeFilter(): boolean {
    return this.filterOperator === FilterOperator.BetweenInclusive
        || this.filterOperator === FilterOperator.BetweenExclusive;
  }

  readonly filterOperators: DropdownOption[] = [
    { id: FilterOperator.None, text: 'None' },
    { id: FilterOperator.IsNull, text: 'IsNull' },
    { id: FilterOperator.IsNotNull, text: 'IsNotNull' },
    { id: FilterOperator.IsEqualTo, text: 'IsEqualTo' },
    { id: FilterOperator.IsNotEqualTo, text: 'IsNotEqualTo' },
    { id: FilterOperator.IsLessThan, text: 'IsLessThan' },
    { id: FilterOperator.IsLessThanOrEqualTo, text: 'IsLessThanOrEqualTo' },
    { id: FilterOperator.IsGreaterThan, text: 'IsGreaterThan' },
    { id: FilterOperator.IsGreaterThanOrEqualTo, text: 'IsGreaterThanOrEqualTo' },
    { id: FilterOperator.BetweenInclusive, text: 'BetweenInclusive' },
    { id: FilterOperator.BetweenExclusive, text: 'BetweenExclusive' }
];

  // constructor() { }

  applyFilter(): void {
    if ((this.isNumericRangeFilter && this.low && this.high)
      || (!this.isNumericRangeFilter && this.low)) {
      this.changes.next(null);
    }
  }

  resetFilter(): void {
      this.filterOperator = FilterOperator.None;
      this.low = null;
      this.high = null;

      this.changes.next(null);
  }

  // accepts(item: any): boolean {
  //   return true;
  // }

  toODataFilter(): ODataFilter {
    return new ODataNumericFilter(this.field, this.filterOperator, this.low, this.high);
  }

  isActive(): boolean {
    switch(this.filterOperator) {
        case FilterOperator.None:
            return false;
        case FilterOperator.IsNull:
        case FilterOperator.IsNotNull:
            return true;
        case FilterOperator.IsEqualTo:
        case FilterOperator.IsNotEqualTo:
        case FilterOperator.IsLessThan:
        case FilterOperator.IsLessThanOrEqualTo:
        case FilterOperator.IsGreaterThan:
        case FilterOperator.IsGreaterThanOrEqualTo:
            return this.low != null;
        case FilterOperator.BetweenInclusive:
        case FilterOperator.BetweenExclusive:
            return this.low != null && this.high != null;
        default:
            throw new Error(`${this.filterOperator} is not supported`);
    }
  }

}
