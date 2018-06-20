import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AddProduct, AddProductComplete, AddProductError, BasketActionTypes, Load, LoadComplete, LoadError, RemoveProduct, 
  RemoveProductComplete, RemoveProductError, UpdateBasketItem, UpdateBasketItemComplete, UpdateBasketItemError } from './../actions/basket.actions';
import { BasketItem } from '../models/BasketItem.model';


@Injectable()
export class BasketEffects {

  open: IDBOpenDBRequest;
  // db: IDBRequest;
  constructor(private actions$: Actions) {
    this.open  = window.indexedDB.open('onweb');
    this.open.onupgradeneeded = function(event) {
        // const db = event.target.result;
        const db = this.result;
        const store = db.createObjectStore('products');
        // const index = store.createIndex('idIndex', 'id');
        
      };
      this.open.onsuccess = function (event) {
        // const db = event.target.result;
        const db = this.result;
    };
}

// @Effect({ dispatch: false })
// openDB$: Observable<any> = defer(() => {
//   return this.db.open('onweb');
// });

@Effect()
  loadBasket$: Observable<Action> = this.actions$
    .ofType<Load>(BasketActionTypes.Load).pipe(
      switchMap( () => {
        this.open  = window.indexedDB.open('onweb');
        this.open.onsuccess = function () {
          const db = this.result;
          let store: IDBObjectStore;
          if (!db.objectStore('products')) {
            store = db.ceateObjectStore('products', {keyPath: 'id'});
          }
          const tx = db.transaction('products', 'readwrite');
          const products: IDBRequest = store.get('products');
          products.onsuccess = function() {
            return new LoadComplete(products.result);
          };
          products.onerror = function() {
            return new LoadError(this.error);
          };
        };
        return null;
      }
    ));

@Effect()
  addProductToBasket$: Observable<Action> = this.actions$.pipe(
    ofType<AddProduct>(BasketActionTypes.AddProduct),
    map( action => action.payload),
    switchMap( (basketItem: BasketItem) =>  {
      const open  = window.indexedDB.open('onweb');
      open.onsuccess = function () {
        const db = open.result;
        const tx = db.transaction('products', 'readwrite');
        let store: IDBObjectStore;
        store = tx.objectStore('products');
        const products: IDBRequest = store.put(basketItem);
        products.onerror = function() {
           return of(new AddProductError(basketItem));
        };
      }
      return of(new AddProductComplete(basketItem));
    }
  )
);

  @Effect()
  removeProductFromBasket$: Observable<Action> = this.actions$.pipe(
    ofType<RemoveProduct>(BasketActionTypes.RemoveProduct),
    map(action => action.payload),
    switchMap( (id: number) =>  {
      const open  = window.indexedDB.open('onweb');
      open.onsuccess = function () {
        const db = open.result;
        const tx = db.transaction('products', 'readwrite');
        let store: IDBObjectStore;
        store = tx.objectStore('products');
        const products: IDBRequest = store.delete(id);
        products.onerror = function() {
           return of(new RemoveProductError(id));
        };
      }
      return of(new RemoveProductComplete(id));
    }
  )
);

  @Effect()
  updateBasketItem$: Observable<Action> = this.actions$.pipe(
    ofType<UpdateBasketItem>(BasketActionTypes.UpdateBasketItem),
    map(action => action.payload),
    switchMap( (basketItem: BasketItem) =>  {
      const open  = window.indexedDB.open('onweb');
      open.onsuccess = function () {
        const db = open.result;
        const tx = db.transaction('products', 'readwrite');
        let store: IDBObjectStore;
        store = tx.objectStore('products');
        const products: IDBRequest = store.put(basketItem);
        products.onerror = function() {
           return of(new UpdateBasketItemError(basketItem.id.toString()));
        };
      }
      return of(new UpdateBasketItemComplete(basketItem));
    }
  )
);
}