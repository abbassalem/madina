import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as fromCategoryActions from '../actions/category.actions';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';
import * as fromCategories from '../reducers/categories.reducer';
import * as index from './../reducers/index';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-product-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-list-product
        [categories]="categories$ | async"
        [routeLinks]="routeLinks">
        (changeTabIndex)= "setCurrentCategoryId($event)"
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

export class ListProductPageComponent implements OnInit {

  routeLinks: Array<{ label: string, link: string, index: number }>;

  searchQuery$: Observable<string>;
  categories$: Observable<Category[]>;
  selectedCategoryId$: Observable<number>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store<fromCategories.CategoryState>) {
    this.categories$ = this.store.pipe(select(index.getAllCategories));
    this.selectedCategoryId$ = of(1);
    // this.store.pipe(select(fromCategories.getSelectedCategoryId));
    this.store.dispatch(new fromCategoryActions.Select(1));
  }

  ngOnInit(): void {
    this.store.dispatch(new fromCategoryActions.Load());
    this.routeLinks = new Array();
    this.categories$.subscribe(cats => {
      cats.forEach((cat, i) => {
        this.routeLinks.push({ label: cat.name, link: '/shop/categories/' + i, index: i });
      });
      });
  }

  setCurrentCategoryId(event) {
      console.log('********** changeTab index: ' + event);
      console.log('********** current selected catx: ' + this.selectedCategoryId$.subscribe (index => console.log(index)));
      this.selectedCategoryId$ = of(event);
      this.store.dispatch(new fromCategoryActions.Select(event + 1));  
      console.log('********** new selected catx: ' + this.selectedCategoryId$.subscribe (index => console.log(index)));
  }

}
