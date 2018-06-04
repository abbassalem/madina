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
} from '../actions/product.actions';
import { Product } from '../models/product.model';
import { Scheduler } from 'rxjs/internal/Scheduler';
import { ProductService } from '../../core/services/product.service';
import { Category } from '../models/category.model';

export const SEARCH_DEBOUNCE = new InjectionToken<number>('Search Debounce');
export const SEARCH_SCHEDULER = new InjectionToken<Scheduler>(
  'Search Scheduler'
);


// TODO: remove debouce 
@Injectable()
export class ProductEffects {
  @Effect()
  getCategories$: Observable<Action> = this.actions$.pipe(
    ofType<Search>(ProductActionTypes.Search),
    debounceTime(this.debounce || 300, this.scheduler || asyncScheduler),
    map(action => action.payload),
    switchMap( () => {
      return this.productService
        .getCategories()
        .pipe(
          map((categories: Category[]) => new LoadComplete(categories)),
          catchError(err => of(new LoadError(err)))
        );
    })
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService,
    @Optional()
    @Inject(SEARCH_DEBOUNCE)
    private debounce: number,
    /**
     * You inject an optional Scheduler that will be undefined
     * in normal application usage, but its injected here so that you can mock out
     * during testing using the RxJS TestScheduler for simulating passages of time.
     */
    @Optional()
    @Inject(SEARCH_SCHEDULER)
    private scheduler: Scheduler
  ) {}
}
