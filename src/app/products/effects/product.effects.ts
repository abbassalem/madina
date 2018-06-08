import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { asyncScheduler, empty, Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  skip,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

import { GoogleBooksService } from '../../core/services/google-books.service';
import {
  ProductActionTypes,
  Search,
  SearchComplete,
  SearchError,
  LoadComplete,
  LoadError,
  ProductActionsUnion
} from '../actions/product.actions';
import { Product } from '../models/product.model';
import { Scheduler } from 'rxjs/internal/Scheduler';
import { ProductService } from '../../core/services/product.service';
import { Category } from '../models/category.model';
import * as fromCategoryActions from '../actions/category.actions';

// TODO: remove debouce 
@Injectable()
export class ProductEffects {
  @Effect()
  getAllProducts$: Observable<Action> = this.actions$.pipe(
    ofType<Search>(ProductActionTypes.Search),
    map(action => action.payload),
    switchMap( () => {
      return this.productService.getProducts()
        .pipe(
          map((products: Product[]) => new SearchComplete(products)),
          catchError(err => of(new SearchError(err)))
        );
    })
  );

  @Effect()
  getAllCategories$: Observable<Action> = this.actions$.pipe(
    ofType<Search>(ProductActionTypes.Search),
    map(action => action.payload),
    switchMap( () => {
      return this.productService.getCategories()
        .pipe(
          map((categories: Category[]) => new fromCategoryActions.SearchComplete(categories)),
          catchError(err => of(new fromCategoryActions.SearchError(err)))
        );
    })
  );
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}
