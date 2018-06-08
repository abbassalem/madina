import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import * as fromCategories from '../reducers/categories.reducer';
import { Category } from '../models/category.model';
import { CategoryActionTypes, Load, Select } from '../actions/category.actions';
import { selectAllBasketItems } from '../reducers/basket.reducer';
// import  '../reducers/index';
// import {  } from '../reducers/index';

@Component({
  selector: 'bc-list-product-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-product-preview-list  [categories]="categories$ | async"></bc-product-preview-list>
  `,
})

export class ProductPreviewListPageComponent implements OnInit  {

  searchQuery$: Observable<string>;
  categories$: Observable<Category[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;
  
  constructor(private store: Store<fromCategories.CategoryState>)  {
    this.categories$ = store.pipe(select(fromCategories.selectAllCategories));
  }

  ngOnInit(): void {
    this.store.dispatch(new Load());
    this.store.dispatch(new Select(2));
  }
}
