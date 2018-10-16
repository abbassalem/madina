import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as fromOrdersActions from '../actions/orders.actions';
import * as reducer from '../reducers/orders.reducer';
import * as index from '../reducers';
import { Order } from '../../shop/models/order.model';

import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-order-view-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-order-view
        [order]="order">
    </app-order-view>
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

export class OrderViewPageComponent implements OnInit {

  order: Order;

  constructor(private route: ActivatedRoute, private store: Store<reducer.OrderState> ) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap( params => {
        const id = Number(params['id']);
        this.store.dispatch(new fromOrdersActions.Select(id));
        return this.store.select(index.getEntityById(id));
      }))
     .subscribe (orderValue => {
         this.order = orderValue;
    });
  }
}

