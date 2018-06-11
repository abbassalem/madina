import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as BasketActions from '../actions/basket.actions';
import { Product } from '../models/product.model';
import { BasketItem } from '../models/BasketItem.model';
import * as index from '../reducers/index';
import { BasketState } from '../reducers/basket.reducer';

@Component({
  selector: 'app-basket-page',
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
// <app-list-product [products]="products$ | async"></app-list-product>

export class BasketPageComponent implements OnInit {
  basketItems$: Observable<BasketItem[]>;

  constructor(private store: Store<BasketState>) {
    this.basketItems$ = store.pipe(select(index.selectAllBasketItems));
  }

  ngOnInit() {
    this.store.dispatch(new BasketActions.Load());
  }
}
