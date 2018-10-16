import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as fromOrdersActions from './../actions/orders.actions';
import { Order } from '../../shop/models/order.model';
import { OrderService } from '../services/orders.service';


@Injectable()
export class OrdersEffects {

  orders: Order[];

  constructor(private actions$: Actions,   private orderService: OrderService) {
  }


  @Effect()
  getAllOrders$: Observable<Action> = this.actions$
    .ofType<fromOrdersActions.Load>(fromOrdersActions.OrderActionTypes.Load).pipe(
    switchMap( () => {
        return this.orderService.getOrders()
          .pipe(
            map((orders: Order[]) => new fromOrdersActions.LoadComplete(orders)),
            catchError(err => of(new fromOrdersActions.LoadError('error in loading orders')))
          );
    })
  );

// @Effect()
// loadBasket$: Observable<Action> = this.actions$
// .ofType<fromOrdersActions.Load>(fromOrdersActions.OrderActionTypes.Load).pipe(
//   switchMap( () => {
//     return Observable.create (observer => {
//       const timeoutId = setTimeout(() => {
//         observer.next(new fromOrdersActions.LoadComplete(this.orders));
//         observer.error(of(new fromOrdersActions.LoadError('error in loading orders')));
//         observer.complete();
//       }, 200);
//       return () => clearTimeout(timeoutId);
//     });
//   }));

// @Effect()
//   copyOrder$: Observable<Action> = this.actions$.pipe(
//     ofType<fromOrdersActions.Addorder>(fromOrdersActions.BasketActionTypes.Addorder),
//     map( action => action.payload),
//     switchMap( (order: order) =>  {
//       const index = this.products.findIndex(product => product.id === order.id);
//       if (index > 0) {
//           this.products[index] = order;
//       } else {
//           this.products.push(order);
//       }
//       window.localStorage.setItem('products', JSON.stringify(this.products));
//       return of(new fromOrdersActions.AddorderComplete(order));
//     }
//   )
// );

}
