import { Location } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromBasketActions from '../actions/basket.actions';
import { BasketItem } from '../models/BasketItem.model';
import { BasketState } from '../reducers/basket.reducer';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html'
})
export class BasketComponent implements OnInit, OnChanges {

  @Input() basketItems: BasketItem[];
  edit = false;
  operation: OperationType = OperationType.NONE;
  selectedIndex = -1;
  quantityControl: FormControl;
  quantityInitialValue = 0;

  basketForm: FormGroup;
  showSteps = false;
  columns = [
    { field: 'name', label: 'Name', visible: true },
    { field: 'description', label: 'Description', visible: true },
    { field: 'price', label: 'Price', visible: true },
    { field: 'quantity', label: 'Quantity', visible: true },
    { field: 'subtotal', label: 'Subtotal', visible: true },
  ];

  times = ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

  constructor(private store: Store<BasketState>, private location: Location, private fb: FormBuilder) {
  }

  ngOnChanges() {
  }

  ngOnInit() {
    this.quantityControl = this.fb.control(null, [Validators.required]);
    this.basketForm = this.fb.group({
        deliveryGroup: this.fb.group({
            deliveryTime: this.fb.control('', Validators.required),
            deliveryDate: this.fb.control('', Validators.required)
        }),
        addressGroup: this.fb.group({
            addressOption: this.fb.control('1', Validators.required),
            streetNumber: this.fb.control('stree number'),
            streetName: this.fb.control('stree name'),
            city: this.fb.control('city'),
            postCode: this.fb.control('post code')
        }),
        confirmationGroup: this.fb.group({
            email: this.fb.control('', Validators.required),
            telephone: this.fb.control('', Validators.required)
        })
    });
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

  toggleShowSteps(){
    this.showSteps = !this.showSteps;
  }

  modify(index: number) {
    if (this.edit) {
      return;
    }
    this.quantityInitialValue = this.basketItems[index].quantity;
    this.operation = OperationType.EDIT;
    this.edit = true;
    this.selectedIndex = index;
    this.quantityControl.setValue(this.basketItems[index].quantity);
  }
  delete(index: number) {
    if (this.edit) {
      return;
    }
    this.operation = OperationType.DELETE;
    this.edit = true;
    this.selectedIndex = index;
  }

  save() {

    switch (this.operation) {
      case OperationType.EDIT: {
        this.basketItems[this.selectedIndex].quantity = this.quantityControl.value;
        this.store.dispatch(new fromBasketActions
          .UpdateBasketItem(this.basketItems[this.selectedIndex]));
        break;
      }
      case OperationType.DELETE: {
        this.store.dispatch(new fromBasketActions
          .RemoveBasketItem(this.basketItems[this.selectedIndex].id));
        break;
      }
    }

    this.selectedIndex = -1;
    this.operation = OperationType.NONE;
    this.edit = false;
  }

  cancel() {
    this.quantityControl.setValue(this.basketItems[this.selectedIndex].quantity);
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
