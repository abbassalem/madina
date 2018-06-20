import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, timeout } from 'rxjs/operators';
import { AddProduct, AddProductComplete, AddProductError, BasketActionTypes, Load, LoadComplete, LoadError, RemoveProduct, 
  RemoveProductComplete, RemoveProductError, UpdateBasketItem, UpdateBasketItemComplete, UpdateBasketItemError } from './../actions/basket.actions';
import { BasketItem } from '../models/BasketItem.model';


@Injectable()
export class BasketEffects {

  open: IDBOpenDBRequest;
  db: IDBDatabase;
  constructor(private actions$: Actions) {
    // const self = this;
    // this.open  = window.indexedDB.open('onweb');
    // this.open.onupgradeneeded = function() {
    //     const db = this.result;
    //     const store = db.createObjectStore('products');
    //     store.createIndex('idIndex', 'id');
        
    //   };
    // this.open.onsuccess = function () {
    //     self.db = self.open.result;
    //     console.log (' ************ BasketEffects[constructor]:  db opened successfully');
    // };
}

@Effect()
loadBasket$: Observable<Action> = this.actions$
.ofType<Load>(BasketActionTypes.Load).pipe(
  switchMap( () => {
    const open  = window.indexedDB.open('onweb');
    let products: IDBRequest;
    open.onsuccess = function () {
      let db = open.result;
      let tx = db.transaction('products', 'readwrite');
      let productStore = tx.objectStore('products');
      products = productStore.getAll();
      // setTimeout( () => console.log('***************  timeout loadBasket : 100ms'), 100);
      products.onerror = function() {
        return of(new LoadError(this.error));
      };
      products.onsuccess = function() {
        console.log('*********** from indexedDB:  products.onsuccess ');
        console.dir(products.result);
      };
    }
    return Observable.create (observer => {
      const timeoutId = setTimeout(() => {
        observer.next(new LoadComplete(products.result));
        observer.complete();
      }, 200);
      return () => clearTimeout(timeoutId);
    });
  }));

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