import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as BasketActions from '../actions/basket.actions';
import { BasketItem } from '../models/BasketItem.model';
import { BasketState } from '../reducers/basket.reducer';
import * as index from '../reducers/index';


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

export class BasketPageComponent implements OnInit {
  basketItems$: Observable<BasketItem[]>;

  constructor(private store: Store<BasketState>) {
    this.basketItems$ = store.pipe(select(index.getAllBasketItems));
  }

  ngOnInit() {
    this.store.dispatch(new BasketActions.Load());
  }
}
