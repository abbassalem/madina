import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as fromCategoryActions from '../actions/category.actions';
import { Category } from '../models/category.model';
import * as fromCategories from '../reducers/categories.reducer';
import * as index from './../reducers/index';

@Component({
  selector: 'app-product-list-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-list-product
        [categories]="categories$ | async"
        [routeLinks]="routeLinks">
    </app-list-product>
  `,
  styles: [
    ` .mat-tab-label-active {
      background-color: #5EADB0;
      color: #D5FEFF;
      border: 1px solid #6B7F7F;
      font-weight: bold;
  }
  .mat-tab-link,
  .mat-tab-label {
      line-height: 30px !important;
      height: 30px !important;
      min-width: 100px !important;
      border: 1px solid #7e7e7e;
  }
  .tabContentContainer {
      border: 1px solid #aaaaaa;
      background: #ffffff 50% 50% repeat-x;
  }`
  ]
})

export class ProductListPageComponent implements OnInit {

  routeLinks: Array<{catId: number, label: string, path: string}> = new Array();

  categories$: Observable<Category[]>;
  selectedCategoryId$: Observable<number>;
  // loading$: Observable<boolean>;
  // error$: Observable<string>;

  constructor(private store: Store<fromCategories.CategoryState>) {
    this.categories$ = this.store.pipe(select(index.getAllCategories));
  }

  ngOnInit(): void {
    this.store.select(index.isLoaded).subscribe( loaded => {
      if (!loaded) {
        this.store.dispatch(new fromCategoryActions.Load());
      } else {
        this.categories$ = this.store.pipe(select(index.getAllCategories));
      }
    });
    this.categories$.subscribe(cats => {
      cats.forEach((cat, i) => {
        this.routeLinks.push({catId: cat.id, label: cat.name, path: '/shop/categories/' + i});
      });
    });
  }

}
