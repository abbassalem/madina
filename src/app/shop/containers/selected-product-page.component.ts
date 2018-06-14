import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as fromBasketActions from '../actions/basket.actions';
import * as fromCategoryActions from '../actions/category.actions';
import { Product } from '../models/product.model';
import * as index from '../reducers/index';

@Component({
  selector: 'app-selected-product-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <mat-card *ngIf="product">
    <mat-card-content>     
        <app-product-detail
          [product]="product"
          [inBasket] = "isSelectedProductInBasket$ | async"
          [valid]= "valid$ | async"
          (add)="addToBasket($event)"
          (remove)="removeFromBasket($event)">
        </app-product-detail>
    </mat-card-content>
    <mat-card-actions align="end" *ngIf="!(isSelectedProductInBasket$ | async)">
          <form [formGroup]="productForm">
            <mat-form-field>
              <input formControlName="quantity" type="number" [value]="0" matInput placeholder="Quantity" min="1" max="100" required>
            </mat-form-field>
        </form>
        <p>SubTotal: € <b>{{productForm.controls['quantity'].value * product.price | number : '1.2-2'}}</b></p>
  </mat-card-actions>

    
  </mat-card>
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
  }`
  ]
})

export class SelectedProductPageComponent implements OnInit {

  @Input() product: Product;

  isSelectedProductInBasket$: Observable<boolean> ;
  productForm: FormGroup;
  valid$: Observable<boolean>;

  constructor(private store: Store<index.ShopState>, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.productForm = new FormGroup({ 'quantity': new FormControl(1, [Validators.required]) });
    this.isSelectedProductInBasket$ = this.store.pipe(select(index.isSelectedProductInBasket));
    this.valid$ = this.productForm.controls['quantity'].valueChanges;
  }
  
  addToBasket(product: Product) {
    let quantityValue = this.productForm.controls['quantity'].value;
    this.store.dispatch(new fromBasketActions.AddProduct({ id: product.id, product: product, quantity: quantityValue}));
    this.store.dispatch(new fromCategoryActions.UpdateProductQuantity(quantityValue)); 
  }
  
  removeFromBasket(product: Product) {
    this.store.dispatch(new fromBasketActions.RemoveProduct(product.id));
    this.store.dispatch(new fromCategoryActions.UpdateProductQuantity(0)); 
  }
}
