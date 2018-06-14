import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { BasketItem } from '../models/BasketItem.model';

@Component({
  selector: 'app-basket',
  template: `
    <h4>Basket Items</h4>
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
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

        <ng-container matColumnDef="subtotal">
        <th mat-header-cell *matHeaderCellDef> SubTotal </th>
        <td mat-cell *matCellDef="let element"> {{element.product.price *  element.quantity | number : '1.2-2'}} </td>
        <td mat-footer-cell *matFooterCellDef> {{getTotal() | number : '1.2-2'}} </td>
      </ng-container>
   

  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"> </tr>

</table>
`,
styles: [`  
  table {
    width: 80%;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    text-align: left;
  }`]
})

// <tr mat-footer-row *matFooterRowDef="displayedColumns"></tr>
export class BasketComponent implements OnChanges{

  @Input() basketItems: BasketItem[];
  dataSource;
  displayedColumns = ['name', 'description', 'quantity','price', 'subtotal'];
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

  getTotal() {
    return this.basketItems.map(t => t.product.price * t.quantity).reduce((acc, value) => acc + value, 0);
  }

}
