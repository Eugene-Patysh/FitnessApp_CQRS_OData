import { Component, Input, Output } from '@angular/core';
import { ODataDateFilter } from 'app/general/models/date-filter';
import { ColumnFilter, DropdownOption, FilterOperator, ODataFilter } from 'app/general/models/filter';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-date-range-filter',
  templateUrl: './date-range-filter.component.html',
  styleUrls: ['./date-range-filter.component.css']
})
export class DateRangeFilterComponent implements ColumnFilter {

  @Input() field!: string;
  @Input() label!: string;
  @Input() filterOperator: FilterOperator = FilterOperator.None;
  @Input() startDate: Date | null = null;
  @Input() endDate: Date | null = null;
  @Output() changes = new Subject<any>();

  readonly filterOperators: DropdownOption[] = [
    { id: FilterOperator.None, text: 'None' },
    { id: FilterOperator.IsNull, text: 'IsNull' },
    { id: FilterOperator.IsNotNull, text: 'IsNotNull' },
    { id: FilterOperator.IsEqualTo, text: 'IsEqualTo' },
    { id: FilterOperator.IsNotEqualTo, text: 'IsNotEqualTo' },
    { id: FilterOperator.Before, text: 'Before' },
    { id: FilterOperator.After, text: 'After' },
    { id: FilterOperator.IsLessThan, text: 'IsLessThan' },
    { id: FilterOperator.IsLessThanOrEqualTo, text: 'IsLessThanOrEqualTo' },
    { id: FilterOperator.IsGreaterThan, text: 'IsGreaterThan' },
    { id: FilterOperator.IsGreaterThanOrEqualTo, text: 'IsGreaterThanOrEqualTo' },
    { id: FilterOperator.BetweenInclusive, text: 'BetweenInclusive' },
    { id: FilterOperator.BetweenExclusive, text: 'BetweenExclusive' }
  ];

  get isDateRangeFilter(): boolean {
      return this.filterOperator === FilterOperator.BetweenInclusive
          || this.filterOperator === FilterOperator.BetweenExclusive;
  }

  get isDatePickerDisabled(): boolean {
      return this.filterOperator === FilterOperator.None || this.filterOperator === FilterOperator.IsNull || this.filterOperator === FilterOperator.IsNotNull;
  }

  // constructor() {}

  isActive(): boolean {
      switch(this.filterOperator) {
          case FilterOperator.None:
              return false;
          case FilterOperator.IsNull:
          case FilterOperator.IsNotNull:
              return true;
          case FilterOperator.IsEqualTo:
          case FilterOperator.IsNotEqualTo:
          case FilterOperator.Before:
          case FilterOperator.After:
          case FilterOperator.IsLessThan:
          case FilterOperator.IsLessThanOrEqualTo:
          case FilterOperator.IsGreaterThan:
          case FilterOperator.IsGreaterThanOrEqualTo:
              return this.startDate != null;
          case FilterOperator.BetweenInclusive:
          case FilterOperator.BetweenExclusive:
              return this.startDate != null && this.endDate != null;
          default:
              throw new Error(`DateFilter does not support ${this.filterOperator}`);
      }
  }

  // accepts(item: any): boolean {
  //     return true;
  // }

  resetFilter() {
      this.filterOperator = FilterOperator.None;
      this.startDate = null;
      this.endDate = null;

      // Signal changes:
      this.changes.next(null);
  }

  applyFilter() {
    if ((this.isDateRangeFilter && this.startDate && this.endDate)
      || (!this.isDateRangeFilter && this.startDate)) {
      this.changes.next(null);
    }
  }

  toODataFilter(): ODataFilter {
      return new ODataDateFilter(this.field, this.filterOperator, this.startDate, this.endDate);
  }
}
