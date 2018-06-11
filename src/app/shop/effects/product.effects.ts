import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ProductService } from '../../core/services/product.service';
import * as fromCategory from '../actions/category.actions';
import { Category } from '../models/category.model';

@Injectable()
export class ProductEffects {
  @Effect()
  getAllCategories$: Observable<Action> = this.actions$.pipe(
    ofType<fromCategory.Load>(fromCategory.CategoryActionTypes.Load),
    switchMap( () => {
      return this.productService.getCategories()
        .pipe(
          map((categories: Category[]) => new fromCategory.LoadComplete(categories)),
          catchError(err => of(new fromCategory.LoadError(err)))
        );
    })
  );

  @Effect()
  getSelectedCategories$: Observable<Action> = this.actions$.pipe(
    ofType<fromCategory.Select>(fromCategory.CategoryActionTypes.Select),
    map(action => action.payload),
    switchMap( catId => {
         return of(new fromCategory.SelectComplete(catId));
    })
  );

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
