import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Order } from '../../shop/models/order.model';
import * as fromOrdersActions from '../actions/orders.actions';
import * as index from '../reducers/index';
import * as reducer from '../reducers/orders.reducer';

@Component({
  selector: 'app-order-list-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-order-list
        [orders]="orders$ | async">
    </app-order-list>
  `,
  styles: [
    ` .mat-tab-label-active {
      background-color: #5EADB0;
      color: #D5FEFF;
      border: 1px solid #6B7F7F;
      font-weight: bold;
  }`
  ]
})

export class OrderListPageComponent implements OnInit {

  orders$: Observable<Order[]>;
  selectedOrderId$: Observable<number>;

  constructor(private store: Store<reducer.OrderState>) {
    this.store.dispatch(new fromOrdersActions.Load());
  }

  ngOnInit(): void {
        this.orders$ = this.store.pipe(select(index.getAllOrders));
  }
}
