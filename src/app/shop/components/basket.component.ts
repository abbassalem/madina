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
  deliveryForm: FormGroup;
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

  times = ['07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00'];

  constructor(private store: Store<BasketState>, private location: Location) {
  }

  ngOnChanges() {
  }
  ngOnInit() {
    this.quantityControl = new FormControl(null, [Validators.required]);
    this.deliveryForm = new FormGroup({deliveryTime: new FormControl('', Validators.required), deliveryDate:  new FormControl('', Validators.required) });
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
  }

  save() {

    // try {
      switch (this.operation) {
        case OperationType.EDIT: {
          this.basketItems[this.selectedIndex].quantity = this.quantityControl.value;
          this.store.dispatch(new fromBasketActions
            .UpdateBasketItem(this.basketItems[this.selectedIndex]));
              break;
            }
            case OperationType.DELETE: {
              this.store.dispatch(new fromBasketActions
                .RemoveProductComplete(this.basketItems[this.selectedIndex].id));
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
    this.edit = false;
  }

  back() {
    this.location.back();
  }
}

export enum OperationType {
  NONE = 'NONE',
  DELETE = 'DELETE',
  EDIT = 'EDIT'
}
