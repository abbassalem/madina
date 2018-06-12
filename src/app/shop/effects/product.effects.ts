import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ProductService } from '../../core/services/product.service';
import * as fromCategoryActions from '../actions/category.actions';
import { Category } from '../models/category.model';

@Injectable()
export class ProductEffects {
  
  @Effect()
  getAllCategories$: Observable<Action> = this.actions$.pipe(
    ofType<fromCategoryActions.Load>(fromCategoryActions.CategoryActionTypes.Load),
    switchMap( () => {
      return this.productService.getCategories()
        .pipe(
          map((categories: Category[]) => new fromCategoryActions.LoadComplete(categories)),
          catchError(err => of(new fromCategoryActions.LoadError(err)))
        );
    })
  );


  
  // @Effect()
  // getSelectedCategory$: Observable<Action> = this.actions$.pipe(
  //   ofType<fromCategoryActions.Select>(fromCategoryActions.CategoryActionTypes.Select),
  //   map(action => action.payload),
  //   switchMap( catId => {
  //        return of(new fromCategoryActions.SelectComplete(catId));
  //   })
  // );

  // getSelectedProduct$: Observable<Action> = this.actions$.pipe(
  //   ofType<fromCategoryActions.SelectProduct>(fromCategoryActions.CategoryActionTypes.SelectProduct),
  //   map(action => action.payload),
  //   switchMap( prodId => {
  //        return of(new fromCategoryActions.SelectProductComplete(prodId));
  //   })
  // );

  // @Effect()
  // getAllProducts$: Observable<Action> = this.actions$.pipe(
  //   ofType<fromProduct.Load>(fromProduct.ProductActionTypes.Load),
  //   switchMap( () => {
  //     return this.productService.getProducts()
  //       .pipe(
  //         map((products: Product[]) => new fromProduct.LoadComplete(products)),
  //         catchError(err => of(new fromProduct.LoadError(err)))
  //       );
  //   })
  // );

  // @Effect()
  // selectCategory$: Observable<Action> = this.actions$.pipe(
  //   ofType<SelectCategory>(CategoryActionTypes.SelectCategory),
  //   map(action => action.payload),
  //   switchMap( (catId: number) => {
  //         return of(new SelectComplete(catId))
  //     })
  // );

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}