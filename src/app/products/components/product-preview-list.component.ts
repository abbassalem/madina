import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';
import { ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import * as fromCategories from './../reducers/categories.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'bc-product-preview-list',
  template: ` 
      <mat-tab-group [(selectedIndex)]= "selectedCategoryId$ | async">
        <mat-tab *ngFor="let cat of categories" [label]="cat.name">
            <bc-product-preview *ngFor="let product of cat.products" [product]="product"></bc-product-preview>
        </mat-tab>
      </mat-tab-group>`,
  styles: [
    `
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  `,
  ],
})

export class ProductPreviewListComponent {

  @Input() categories: Category[];

  selectedCategoryId$: Observable<number>;
  constructor(private store: Store<fromCategories.CategoryState>)  {
    this.selectedCategoryId$ = store.pipe(select(fromCategories.getSelectCategoryId));
  }
  
}