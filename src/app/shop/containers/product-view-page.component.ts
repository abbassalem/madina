import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromCategoryActions from '../actions/category.actions';
import { Product } from '../models/product.model';
import * as fromCategoryReducer from '../reducers/categories.reducer';
import * as index from '../reducers/index';


@Component({
  selector: 'app-product-view-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-product-selected-page [product]="product$ | async" ></app-product-selected-page>
  `,
})

export class ProductViewPageComponent implements OnInit, OnDestroy {

  product$: Observable<Product>;

  constructor(private store: Store<fromCategoryReducer.CategoryState>, private route: ActivatedRoute) {
  }

  ngOnInit(){
    this.route.params
    .subscribe( params => {
        const id = +params.productId;
        this.store.dispatch(new fromCategoryActions.SelectProduct(id));
        this.product$ = this.store.pipe(select(index.getSelectedProduct));
    });
  }

  ngOnDestroy() {
  }
}
