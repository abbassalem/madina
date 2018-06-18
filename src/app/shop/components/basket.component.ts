import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { BasketItem } from '../models/BasketItem.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BasketState } from '../reducers/basket.reducer';
import { Store } from '@ngrx/store';
import * as fromBasketActions from '../actions/basket.actions';
import * as fromCategoryActions from '../actions/category.actions';
import { Location } from '@angular/common';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html'
})
export class BasketComponent implements OnInit, OnChanges {

  @Input() basketItems: BasketItem[];
  edit = false;
  basketForm: FormGroup;
  quantityControl: FormControl;
  operation: OperationType = OperationType.NONE;
  selectedIndex = -1;
  initialValue = 0;
  columns = [
    {field: 'name', label: 'Name', visible: true},
    {field: 'description', label: 'Description', visible: true},
    {field: 'price', label: 'Price', visible: true},
    {field: 'quantity', label: 'Quantity', visible: true},
    {field: 'subtotal', label: 'Subtotal', visible: true},
  ];

  constructor(private store: Store<BasketState>, private location: Location) {
  }

  ngOnChanges() {
  }
  ngOnInit() {
    // this.basketForm = new FormGroup({ 'quantity': new FormControl(null, [Validators.required]) });
    this.quantityControl = new FormControl(null, [Validators.required]);
  }
  getTotal() {
    return this.basketItems.map(
      (item, index) => {
        if (index === this.selectedIndex) {
          return (item.product.price * this.quantityControl.value);
        } else {
          return (item.product.price * item.quantity);
        }
      })
      .reduce((acc, value) => acc + value, 0);
  }

  modify(index: number ) {
    if (this.edit)  {
      return;
    }
    this.initialValue = this.basketItems[index].quantity;
    this.operation = OperationType.EDIT;
    this.edit = true;
    this.selectedIndex = index;
    this.quantityControl.setValue(this.basketItems[index].quantity) ;
  }
  delete(index: number) {
    if (this.edit)  {
      return;
    }
    this.operation = OperationType.DELETE;
    this.edit = true;
    this.selectedIndex = index;
    // this.quantityControl.disable() ;
  }

  save() {

    // try {
      switch (this.operation) {
        case OperationType.EDIT: {
          this.basketItems[this.selectedIndex].quantity = this.quantityControl.value;
          this.store.dispatch(new fromBasketActions
            .UpdateBasketItem(this.basketItems[this.selectedIndex]));
            // .UpdateBasketItem({ id: this.basketItems[this.selectedIndex].id, quantity: this.quantityControl.value}));
            this.store.dispatch(new fromCategoryActions
              .UpdateProductQuantity( {productId: this.basketItems[this.selectedIndex].id, quantity: this.quantityControl.value}));
              break;
            }
            case OperationType.DELETE: {
              this.store.dispatch(new fromBasketActions
                .RemoveProductComplete(this.basketItems[this.selectedIndex].id));
                this.store.dispatch(new fromCategoryActions
                  .UpdateProductQuantity( {quantity: 0}));
                  break;
                }
        }

      this.selectedIndex = -1;
      this.operation = OperationType.NONE;
      this.edit = false;
  }

  cancel() {
    this.quantityControl.setValue( this.basketItems[this.selectedIndex].quantity) ;
    this.selectedIndex = -1;
    this.operation = OperationType.NONE;
    // this.edit = false;
  }

  backToProducts() {
    this.location.back();
  }
}

export enum OperationType {
  NONE = 'NONE',
  DELETE = 'DELETE',
  EDIT = 'EDIT'
}
