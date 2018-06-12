import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromCategoryActions from '../actions/category.actions';
import { Product } from '../models/product.model';
import * as fromCategoryReducer from '../reducers/categories.reducer';
import * as index from '../reducers/index';


@Component({
  selector: 'app-view-product-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-selected-product-page [product]="product$ | async"></app-selected-product-page>
  `,
})

export class ViewProductPageComponent implements OnDestroy {

  product$: Observable<Product>;

  constructor(private store: Store<fromCategoryReducer.CategoryState>, route: ActivatedRoute) {
    route.params
      .subscribe( params => {
          const id = +params.productId;
          this.store.dispatch(new fromCategoryActions.SelectProduct(id));
          this.product$ = this.store.pipe(select(index.getSelectedProduct));
      });
  }

  ngOnDestroy() {
  }
}
