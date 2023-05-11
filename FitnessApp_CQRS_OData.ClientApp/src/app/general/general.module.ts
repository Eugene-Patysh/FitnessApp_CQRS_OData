import { StringFilterComponent } from './components/string-filter/string-filter.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NumberFilterComponent } from './components/number-filter/number-filter.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateRangeFilterComponent } from './components/date-range-filter/date-range-filter.component';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatDividerModule,
    MatMenuModule,
    MatListModule,
    RouterModule
  ],
  exports: [
    MatTableModule,
    MatPaginatorModule,
    StringFilterComponent,
    NumberFilterComponent,
    DateRangeFilterComponent,
    MatSortModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatDividerModule,
    MatMenuModule,
    MatListModule,
    RouterModule
  ],
  declarations: [
    StringFilterComponent,
    NumberFilterComponent,
    DateRangeFilterComponent
  ]
})
export class GeneralModule { }
