import { Component, Input, Output } from '@angular/core';
import { ColumnFilter, DropdownOption, FilterOperator, ODataFilter } from 'app/general/models/filter';
import { ODataStringFilter } from 'app/general/models/string-filter';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-string-filter',
  templateUrl: './string-filter.component.html',
  styleUrls: ['./string-filter.component.css']
})
export class StringFilterComponent implements ColumnFilter {

  @Input() field!: string;
  @Input() label!: string;
  @Input() filterOperator: FilterOperator = FilterOperator.None;
  @Input() search: string | null = null;
  @Output() changes = new Subject<any>();

  readonly filterOperators: DropdownOption[] = [
    { id: FilterOperator.None, text: 'None' },
    { id: FilterOperator.IsNull, text: 'IsNull' },
    { id: FilterOperator.IsNotNull, text: 'IsNotNull' },
    { id: FilterOperator.IsEmpty, text: 'IsEmpty' },
    { id: FilterOperator.IsNotEmpty, text: 'IsNotEmpty' },
    { id: FilterOperator.IsEqualTo, text: 'IsEqualTo' },
    { id: FilterOperator.IsNotEqualTo, text: 'IsNotEqualTo' },
    { id: FilterOperator.Contains, text: 'Contains' },
    { id: FilterOperator.NotContains, text: 'NotContains' },
    { id: FilterOperator.StartsWith, text: 'StartsWith' },
    { id: FilterOperator.EndsWith, text: 'EndsWith' }
];

  // constructor() { }

  // ngOnInit(): void {
  // }

  applyFilter(): void {
    if (this.search
      || this.filterOperator === FilterOperator.None
      || this.filterOperator === FilterOperator.IsNull
      || this.filterOperator === FilterOperator.IsNotNull
      || this.filterOperator === FilterOperator.IsEmpty
      || this.filterOperator === FilterOperator.IsNotEmpty) {
      this.changes.next(null);
    }
  }

  resetFilter(): void {
      this.filterOperator = FilterOperator.None;
      this.search = null;

      this.changes.next(null);
  }

  isActive(): boolean {
      return this.filterOperator !== FilterOperator.None;
  }

  // accepts(item: any): boolean {
  //     return true;
  // }

  toODataFilter(): ODataFilter {
      return new ODataStringFilter(this.field, this.filterOperator, this.search);
  }

}
