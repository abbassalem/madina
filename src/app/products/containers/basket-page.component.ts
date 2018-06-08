import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as BasketActions from '../actions/basket.actions';
import { Product } from '../models/product.model';
import { BasketItem } from '../models/BasketItem.model';
import * as fromBasket from '../reducers/basket.reducer';
import  '../reducers/index';

@Component({
  selector: 'bc-basket-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-title>My Basket</mat-card-title>
    </mat-card>

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
// <bc-product-preview-list [products]="products$ | async"></bc-product-preview-list>
  // 
export class BasketPageComponent implements OnInit {
  
  basketItems$: Observable<BasketItem[]>;

  constructor(private store: Store<fromBasket.BasketState>) {
    this.basketItems$ = store.pipe(select(fromBasket.selectAllBasketItems));
  }

  ngOnInit() {
    this.store.dispatch(new BasketActions.Load());
  }
}
