import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { BasketItem } from '../models/BasketItem.model';

@Component({
  selector: 'app-basket',
  template: `
  <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

  <!-- Checkbox Column -->
  <ng-container matColumnDef="select">
    <th mat-header-cell *matHeaderCellDef>
      <mat-checkbox (change)="$event ? masterToggle() : null"
                    [checked]="selection.hasValue() && isAllSelected()"
                    [indeterminate]="selection.hasValue() && !isAllSelected()">
      </mat-checkbox>
    </th>
    <td mat-cell *matCellDef="let row">
      <mat-checkbox (click)="$event.stopPropagation()"
                    (change)="$event ? selection.toggle(row) : null"
                    [checked]="selection.isSelected(row)">
      </mat-checkbox>
    </td>
  </ng-container>

  <ng-container matColumnDef="name">
    <th mat-header-cell *matHeaderCellDef> Name </th>
    <td mat-cell *matCellDef="let element"> {{element.product.name}} </td>
  </ng-container>

  <ng-container matColumnDef="description">
    <th mat-header-cell *matHeaderCellDef> Description </th>
    <td mat-cell *matCellDef="let element"> {{element.product.description}} </td>
  </ng-container>

  <ng-container matColumnDef="quantity">
    <th mat-header-cell *matHeaderCellDef> Quantity </th>
    <td mat-cell *matCellDef="let element"> {{element.quantity}} </td>
  </ng-container>

  <ng-container matColumnDef="price">
    <th mat-header-cell *matHeaderCellDef> Price </th>
    <td mat-cell *matCellDef="let element"> {{element.product.price}} </td>
  </ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"
      (click)="selection.toggle(row)">
  </tr>
</table>
`,
styles: [`  
  table {
    width: 100%;
  }`]
})

export class BasketComponent implements OnChanges{

  @Input() basketItems: BasketItem[];
  dataSource;
  displayedColumns = ['name', 'description', 'quantity','price'];
  selection = new SelectionModel<BasketItem>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  constructor() {
  }

  ngOnChanges() {
      this.dataSource = new MatTableDataSource<BasketItem>(this.basketItems);
  }


}
