import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import * as ProductActions from '../actions/product.actions';
import { Product } from '../models/product.model';
import * as fromProducts from '../reducers';

@Component({
  selector: 'bc-list-product-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-product-preview-list [products]="products$ | async"></bc-product-preview-list>
  `,
})
//  <bc-product-search [query]="searchQuery$ | async" [searching]="loading$ | async" [error]="error$ | async" (search)="search($event)"></bc-product-search>
export class ProductPreviewListPageComponent implements OnInit  {
  searchQuery$: Observable<string>;
  products$: Observable<Product[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;
  
  constructor(private store: Store<fromProducts.State>)  {
    // this.searchQuery$ = store.pipe(select(fromProducts.getSearchQuery), take(1));
    this.products$ = store.pipe(select(fromProducts.getAllProducts));
    // this.loading$ = store.pipe(select(fromProducts.getSearchLoading));
    // this.error$ = store.pipe(select(fromProducts.getSearchError));
  }

  ngOnInit(): void {
    this.store.dispatch(new ProductActions.Search(''));
  }

  search(query: string) {
    this.store.dispatch(new ProductActions.Search(query));
  }
}
