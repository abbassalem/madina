import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as BasketActions from '../actions/basket.actions';
import { Product } from '../models/product.model';
import * as fromProducts from '../reducers';

@Component({
  selector: 'bc-basket-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-title>My Basket</mat-card-title>
    </mat-card>

    <bc-product-preview-list [products]="products$ | async"></bc-product-preview-list>
  `,
  styles: [
    `
    mat-card-title {
      display: flex;
      justify-content: center;
    }
  `,
  ],
})
export class BasketPageComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private store: Store<fromProducts.State>) {
    this.products$ = store.pipe(select(fromProducts.getBasketProducts));
  }

  ngOnInit() {
    this.store.dispatch(new BasketActions.Load());
  }
}
