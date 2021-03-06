import { ChangeDetectionStrategy, Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as fromBasketActions from '../actions/basket.actions';
import { Product } from '../models/product.model';
import * as index from '../reducers/index';
import { Location } from '@angular/common';
import { BasketItem } from '../models/BasketItem.model';

@Component({
  selector: 'app-product-selected-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <mat-card *ngIf="product">
    <mat-card-actions align="center" *ngIf="!(isSelectedProductInBasket$ | async)">
          <mat-form-field>
              <input #qty [formControl]="quantityFormControl" type="number" [value]="0"
                    matInput placeholder="Quantity" min="1" max="100" required>
          </mat-form-field>
        &nbsp;
        <p>€ <b>{{qty.value * product.price | number : '1.2-2'}}</b></p>
    </mat-card-actions>
  <mat-card-content>
        <app-product-detail
          [product]="product"
          [quantity]="quantity$ | async"
          [inBasket] = "isSelectedProductInBasket$ | async"
          [valid]= "valid$ | async"
          (add)="addToBasket($event)"
          (remove)="removeFromBasket($event)">
        </app-product-detail>
    </mat-card-content>
    <mat-card-footer>
    <p style="padding:5px;margin:5px">
           <button mat-raised-button  (click)="back()">
             Close <mat-icon>close</mat-icon>
           </button>
    </p>
  </mat-card-footer>
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

export class ProductSelectedPageComponent implements OnInit {

  @Input() product: Product;
  quantity$: Observable<number>;
  isSelectedProductInBasket$: Observable<boolean>;
  quantityFormControl: FormControl;
  valid$: Observable<boolean>;
  selectedCategoryId$: Observable<number>;
  basketItems: BasketItem[];
  // [routerLink]="['/shop/categories/'+ categoryTabIndex]"

  constructor(private store: Store<index.ShopState>, private route: ActivatedRoute, private location: Location) {
  }

  ngOnInit() {
    this.quantityFormControl = new FormControl(0, [Validators.required]);
    this.isSelectedProductInBasket$ = this.store.pipe(select(index.isSelectedProductInBasket));
    this.valid$ = this.quantityFormControl.valueChanges;
    this.selectedCategoryId$ = this.store.select(index.getSelectedCategoryId);
    this.store.pipe(select(index.getAllBasketItems)).subscribe(values => {
      this.basketItems = values;
      this.quantity$ = of(this.getQuantity(values));
    });

  }

  addToBasket(product: Product) {
    const quantityValue = this.quantityFormControl.value;
    this.quantity$ = of(quantityValue);
    this.store.dispatch(new fromBasketActions.AddBasketItem({ id: product.id, product: product, quantity: quantityValue }));

  }

  removeFromBasket(product: Product) {
    this.store.dispatch(new fromBasketActions.RemoveBasketItem(product.id));
  }

  backToProducts() {
    this.location.back();
  }
  getQuantity(values): number {
    let qty;
    if (values) {
      qty = values.find(item => item.id === this.product.id);
      if (qty) {
        return qty.quantity;
      } else {
        return 0;
      }
    }
  }

  back() {
    history.back();
  }
}



// <mat-card-footer>
    //     <mat-grid-list cols="2">
    //         <mat-grid-tile>
    //           <a  style="margin-left:10px">
    //             <button   mat-raised-button color="accent" (click)="backToProducts()">
    //             <mat-icon>chevron_left</mat-icon>Back to products
    //             </button>
    //           </a>
    //       </mat-grid-tile>
    //       <mat-grid-tile>
    //           <a [routerLink]="['/shop/basket']" style="padding-right:10px">
    //             <button   mat-raised-button color="accent">
    //               Go to basket<mat-icon>chevron_right</mat-icon>
    //             </button>
    //           </a>
    //       </mat-grid-tile>
    //     </mat-grid-list>
    // </mat-card-footer>