import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromProducts from '../reducers';
import * as BasketActions from '../actions/basket.actions';
import { Product } from '../models/product.model';
import { FormControl, Validators, FormGroup } from '@angular/forms';

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
  styles: [`
  :host {
    display: flex;
    justify-content: center;
    margin: 75px 0;
  }
  mat-card {
    max-width: 600px;
  }
  mat-card-title-group {
    margin-left: 0;
  }
  img {
    width: 60px;
    min-width: 60px;
    margin-left: 5px;
  }
  mat-card-content {
    margin: 15px 0 50px;
  }
  mat-card-actions {
    margin: 25px 0 0 !important;
  }¦
  mat-card-footer {
    padding: 0 25px 25px;
    position: relative;
  }
    `
  ]
})

// <mat-card>
// <mat-card-actions align="start">
//   <form [formGroup]="productForm">
//       <mat-form-field>
//         <input formControlName="quantity" type="number" 
//             matInput placeholder="quantity" value="1">
//       </mat-form-field>
//   </form>
//   </mat-card-actions>
//  </mat-card>
export class SelectedProductPageComponent {

  product$: Observable<Product>;
  productForm: FormGroup;

  constructor(private store: Store<fromProducts.State>) {
    // this.product$ = store.pipe(select(fromProducts.getSelectedProduct)) as Observable<Product>;
    this.productForm = new FormGroup({ 'quantity': new FormControl(1, [Validators.required]) });
  }

  addToBasket(product: Product) {
    const quantity = this.productForm.controls['quantity'].value;
    this.store.dispatch(new BasketActions.AddProduct({id: product.id, quantity: quantity}));
  }

  removeFromBasket(product: Product) {
    this.store.dispatch(new BasketActions.RemoveProduct({id: product.id, quantity: 0}));
  }
}
