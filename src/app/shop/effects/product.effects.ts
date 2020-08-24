import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ProductService } from '../../core/services/product.service';
import * as fromCategoryActions from '../actions/category.actions';
import { Category } from '../models/category.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class ProductEffects {

  @Effect()
  getAllCategories$: Observable<Action> = this.actions$.pipe(
    ofType<fromCategoryActions.Load>(fromCategoryActions.CategoryActionTypes.Load),
    switchMap( () => {
          return this.productService.getCategories()
          .pipe(
            map( (cats: Array<Category>) => {
                return new fromCategoryActions.LoadComplete(cats);
            }),
            catchError(err => of(new fromCategoryActions.LoadError(err)))
        )
    })
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private db: AngularFirestore
  ) {}
}
