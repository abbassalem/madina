import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of, ObservableInput } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { BasketItem } from '../models/BasketItem.model';
import * as fromBasketActions from './../actions/basket.actions';
import { Order } from '../models/order.model';
import { BasketService } from 'src/app/core/services/basket.service';


@Injectable()
export class BasketEffects {

  products: BasketItem[];

  constructor(private actions$: Actions, private basketService: BasketService) {
    if (window.localStorage) {
      this.products = JSON.parse(window.localStorage.getItem('products'));
      if (!this.products) {
        this.products = [];
        window.localStorage.setItem('products', JSON.stringify(this.products));
      }
    } else {
      console.log('locaStorage not supported');
    }
  }

  @Effect()
  saveOrder$: Observable<Action> = this.actions$.pipe(
    ofType<fromBasketActions.SaveBasket>(fromBasketActions.BasketActionTypes.SaveBasket),
    map(action => action.payload),
    switchMap( (order: Order) => {
      return this.basketService.saveOrder(order).then( result => { 
      console.log('saveOrder => ');
      console.dir(result);
      return new fromBasketActions.SaveBasketComplete('success')
    })
     .catch (error => new fromBasketActions.SaveBasketError(error))
    })
  );

  // @Effect()
  // loadBasket$: Observable<Action> = this.actions$.pipe(
  //     ofType<fromBasketActions.Load>(fromBasketActions.BasketActionTypes.Load),
  //     switchMap(() => {
  //       this.products = JSON.parse(window.localStorage.getItem('products'));
  //       return Observable.create(observer => {
  //         // const timeoutId = setTimeout(() => {
  //           observer.next(new fromBasketActions.LoadComplete(this.products));
  //           observer.error(new fromBasketActions.LoadError('error in loading product from localStorage'));
  //           observer.complete();
  //         // }, 200);
  //         // return () => clearTimeout(timeoutId);
  //       });
  //     })
  // );

  @Effect()
  addOrderItemsToBasket$: Observable<Action> = this.actions$.pipe(
    ofType<fromBasketActions.AddOrderItems>(fromBasketActions.BasketActionTypes.AddOrderItems),
    map(action => action.payload),
    switchMap((basketItems: BasketItem[]) => {
      basketItems.forEach(bi => this.products.push(bi));
      window.localStorage.setItem('products', JSON.stringify(this.products));
      return of(new fromBasketActions.AddOrderItemsComplete(basketItems));
    }
    )
  );

  @Effect()
  addProductToBasket$: Observable<Action> = this.actions$.pipe(
    ofType<fromBasketActions.AddBasketItem>(fromBasketActions.BasketActionTypes.AddBasketItem),
    map(action => action.payload),
    switchMap((basketItem: BasketItem) => {
        const index = this.products.findIndex(product => product.id === basketItem.id);
        if (index > 0) {
          this.products[index] = basketItem;
        } else {
          this.products.push(basketItem);
        }
        window.localStorage.setItem('products', JSON.stringify(this.products));
        return of(new fromBasketActions.AddBasketItemComplete(basketItem));
    }
    )
  );

  @Effect()
  removeProductFromBasket$: Observable<Action> = this.actions$.pipe(
    ofType<fromBasketActions.RemoveBasketItem>(fromBasketActions.BasketActionTypes.RemoveBasketItem),
    map(action => action.payload),
    switchMap((id: number) => {
      const index = this.products.findIndex(product => product.id === id);
      window.localStorage.removeItem('products');
      this.products.splice(index, 1);
      window.localStorage.setItem('products', JSON.stringify(this.products));
      return of(new fromBasketActions.RemoveBasketItemComplete(id));
    }
    )
  );

  @Effect()
  updateBasketItem$: Observable<Action> = this.actions$.pipe(
    ofType<fromBasketActions.UpdateBasketItem>(fromBasketActions.BasketActionTypes.UpdateBasketItem),
    map(action => action.payload),
    switchMap((basketItem: BasketItem) => {
      const index = this.products.findIndex(product => product.id === basketItem.id);
      window.localStorage.removeItem('products');
      this.products[index] = basketItem;
      window.localStorage.setItem('products', JSON.stringify(this.products));
      return of(new fromBasketActions.UpdateBasketItemComplete(basketItem));
    }
    )
  );
}
