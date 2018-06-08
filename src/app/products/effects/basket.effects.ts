import { Injectable } from '@angular/core';
import { Database } from '@ngrx/db';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { defer, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, toArray } from 'rxjs/operators';

import {
  AddProduct,
  AddProductFail,
  AddProductSuccess,
  BasketActionTypes,
  LoadFail,
  LoadSuccess,
  RemoveProduct,
  RemoveProductFail,
  RemoveProductSuccess,
} from './../actions/basket.actions';
import { BasketItem } from '../models/BasketItem.model';

@Injectable()
export class BasketEffects {
 
  @Effect({ dispatch: false })
  openDB$: Observable<any> = defer(() => {
    return this.db.open('onweb');
  });

  @Effect()
  loadBasket$: Observable<Action> = this.actions$.pipe(
    ofType(BasketActionTypes.Load),
    switchMap(() =>
      this.db
        .query('products')
        .pipe(
          toArray(),
          map((basketItems: BasketItem[]) =>  new LoadSuccess(basketItems)),
          catchError(error => of(new LoadFail(error)))
        )
    )
  );

  @Effect()
  addProductToBasket$: Observable<Action> = this.actions$.pipe(
    ofType<AddProduct>(BasketActionTypes.AddProduct),
    map(action => action.payload),
    mergeMap(basketItem =>
      this.db
        .insert('products', [basketItem])
        .pipe(
          map(() => new AddProductSuccess(basketItem)),
          catchError(() => of(new AddProductFail(basketItem)))
        )
    )
  );

  @Effect()
  removeProductFromBasket$: Observable<Action> = this.actions$.pipe(
    ofType<RemoveProduct>(BasketActionTypes.RemoveProduct),
    map(action => action.payload),
    mergeMap(basketItem =>
      this.db
        .executeWrite('products', 'delete', [basketItem])
        .pipe(
          map(() => new RemoveProductSuccess(basketItem)),
          catchError(() => of(new RemoveProductFail(basketItem)))
        )
    )
  );

  constructor(private actions$: Actions, private db: Database) {}
}
