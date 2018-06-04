import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromProducts from '../reducers';
import * as BasketActions from '../actions/basket.actions';
import { Product } from '../models/product.model';

@Component({
  selector: 'bc-selected-product-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-product-detail
      [product]="product$ | async"
      [inBasket]="isSelectedProductInBasket$ | async"
      (add)="addToBasket($event)"
      (remove)="removeFromBasket($event)">
    </bc-product-detail>
  `,
})
export class SelectedProductPageComponent {
  product$: Observable<Product>;
  isSelectedProductInBasket$: Observable<boolean>;

  constructor(private store: Store<fromProducts.State>) {
    this.product$ = store.pipe(select(fromProducts.getSelectedProduct)) as Observable<Product>;
    this.isSelectedProductInBasket$ = store.pipe(
      select(fromProducts.isSelectedProductInBasket)
    );
  }

  addToBasket(product: Product) {
    this.store.dispatch(new BasketActions.AddProduct(product));
  }

  removeFromBasket(product: Product) {
    this.store.dispatch(new BasketActions.RemoveProduct(product));
  }
}
