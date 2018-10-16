import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../shop/models/order.model';

@Component({
  selector: 'app-order-list',
  template: `
  <app-order-search (search)= "search($event)"></app-order-search>
  <mat-accordion  style="min-width: 80%">
    <app-order-view  *ngFor="let order of orders" [order]="order"> </app-order-view>
  </mat-accordion>
`,
  styles: [
    `
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    .toolbar-flex{
      flex: 1 0.5 auto;
      float:left
    }
  `,
  ],
})

export class OrderListComponent implements OnInit {

  @Input() orders: Order[];

  constructor() {
  }

  ngOnInit() {
  }

  search(event) {
    const start = event.startDate;
    const end = event.endDate;
    this.orders = this.orders.filter ( order => this.filterDate(order, start, end));
  }

  filterDate(order: Order, start: Date, end: Date) {
      const s = new Date(start.getFullYear(), start.getMonth(), start.getDate());
      const e = new Date(end.getFullYear(), end.getMonth(), end.getDate());
      const dd = new Date(order.orderDate);
      const d = new Date(dd.getFullYear(), dd.getMonth(), dd.getDate());
      if ( d >= s && d <= e ) {
        return true;
      } else {
        return false;
      }
  }
}
