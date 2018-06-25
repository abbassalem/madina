import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as BasketActions from '../actions/basket.actions';
import { BasketItem } from '../models/BasketItem.model';
import  * as fromRoot from  '../../../app/reducers/index';
import { BasketState } from '../reducers/basket.reducer';
import * as index from '../reducers/index';


@Component({
  selector: 'app-basket-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <app-basket [basketItems]="basketItems$ | async" [deliveryTimes]="deliveryTimes" > </app-basket>
  `,
  styles: [
  ],
})

export class BasketPageComponent implements OnInit {

  basketItems$: Observable<BasketItem[]>;
  deliveryTimes: string[];

  constructor(private store: Store<BasketState>) {

  }

  ngOnInit() {
    this.basketItems$ = this.store.pipe(select(index.getAllBasketItems));
    this.store.pipe(select(fromRoot.getDeliveryTimes)).subscribe ( times => 
      this.deliveryTimes = times
    );
  }
}
