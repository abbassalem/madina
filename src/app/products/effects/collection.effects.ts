import { Injectable } from '@angular/core';
import { Database } from '@ngrx/db';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { defer, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, toArray } from 'rxjs/operators';

import { Product } from '../models/product.model';
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

@Injectable()
export class BasketEffects {
  /**
   * This effect does not yield any actions back to the store. Set
   * `dispatch` to false to hint to @ngrx/effects that it should
   * ignore any elements of this effect stream.
   *
   * The `defer` observable accepts an observable factory function
   * that is called when the observable is subscribed to.
   * Wrapping the database open call in `defer` makes
   * effect easier to test.
   */
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
          map((products: Product[]) => new LoadSuccess(products)),
          catchError(error => of(new LoadFail(error)))
        )
    )
  );

  @Effect()
  addProductToBasket$: Observable<Action> = this.actions$.pipe(
    ofType<AddProduct>(BasketActionTypes.AddProduct),
    map(action => action.payload),
    mergeMap(product =>
      this.db
        .insert('products', [product])
        .pipe(
          map(() => new AddProductSuccess(product)),
          catchError(() => of(new AddProductFail(product)))
        )
    )
  );

  @Effect()
  removeProductFromBasket$: Observable<Action> = this.actions$.pipe(
    ofType<RemoveProduct>(BasketActionTypes.RemoveProduct),
    map(action => action.payload),
    mergeMap(product =>
      this.db
        .executeWrite('products', 'delete', [product.id])
        .pipe(
          map(() => new RemoveProductSuccess(product)),
          catchError(() => of(new RemoveProductFail(product)))
        )
    )
  );

  constructor(private actions$: Actions, private db: Database) {}
}
