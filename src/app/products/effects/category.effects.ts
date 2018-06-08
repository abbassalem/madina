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

import {
  CategoryActionTypes,
  Search,
  SearchComplete,
  SearchError,
  Load,
  LoadComplete,
  LoadError,
  SelectCategory,
  CategoryActionsUnion
} from '../actions/category.actions';
import { Scheduler } from 'rxjs/internal/Scheduler';
import { ProductService } from '../../core/services/product.service';
import { Category } from '../models/category.model';

// TODO: remove debouce 
@Injectable()
export class CategoryEffects {
  @Effect()
  getAllCategories$: Observable<Action> = this.actions$.pipe(
    ofType<Load>(CategoryActionTypes.Load),
    switchMap( () => {
      return this.productService.getCategories()
        .pipe(
          map((categories: Category[]) => new LoadComplete(categories)),
          catchError(err => of(new LoadError(err)))
        );
    })
  );

  @Effect()
  selectCategory$: Observable<Action> = this.actions$.pipe(
    ofType<SelectCategory>(CategoryActionTypes.SelectCategory),
    map(action => action.payload),
    switchMap( (catId: number) => {
          return of(new SelectComplete(catId))
      })
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}
