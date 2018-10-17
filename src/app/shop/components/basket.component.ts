import { Location } from '@angular/common';
import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as fromBasketActions from '../actions/basket.actions';
import { BasketItem } from '../models/BasketItem.model';
import { BasketState } from '../reducers/basket.reducer';
import { MatHorizontalStepper, MatStep, MatSnackBarRef, MatSnackBar } from '@angular/material';
import * as fromRoot from '../../reducers';
import { Observable } from 'rxjs';
import * as fromAuth from '../../auth/reducers';
import * as fromConfig from '../../reducers/index';
import * as fromConfigActions from './../../core/actions/configuration.actions';
import { Order, OrderStatus } from '../models/order.model';
import { BasketService } from '../../core/services/basket.service';
import { User } from '../../auth/models/user';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  @Input() basketItems: BasketItem[];
  @Input() deliveryTimes: Array<string>;

  order: Order;
  // user$: Observable<User>;
  userId: number;
  edit = false;
  operation: OperationType = OperationType.NONE;
  selectedIndex = -1;
  quantityControl: FormControl;
  quantityInitialValue = 0;
  basketForm: FormGroup;
  showSteps = false;
  isLinear = false;
  columns = [
    { field: 'name', label: 'Name', visible: true },
    { field: 'description', label: 'Description', visible: true },
    { field: 'price', label: 'Price', visible: true },
    { field: 'quantity', label: 'Quantity', visible: true },
    { field: 'subtotal', label: 'Subtotal', visible: true },
  ];

  loggedIn$: Observable<boolean>;

  constructor(private store: Store<BasketState>,
              private location: Location,
              private fb: FormBuilder,
              private rootStore: Store<fromRoot.State>,
              private basketService: BasketService,
              private snakBar: MatSnackBar ) {
  }

  ngOnInit() {
    this.loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));
    this.store.select(fromAuth.getUser).pipe(
      filter(Boolean),
      map(user => user.id)
    ).subscribe ( id => {
      console.log('userId = ' + id);
      this.userId = id;
    }) ;
    this.quantityControl = this.fb.control(null, [Validators.required]);
    this.basketForm = this.fb.group({
        deliveryGroup: this.fb.group({
            deliveryTime: this.fb.control('', Validators.required),
            deliveryDate: this.fb.control('', Validators.required)
        }),
        addressGroup: this.fb.group({
            addressOption: this.fb.control(2, Validators.required),
            street: this.fb.control('', Validators.required),
            city: this.fb.control('', Validators.required),
            postCode: this.fb.control('', Validators.required)
        }),
        contactGroup: this.fb.group({
            email: this.fb.control('', Validators.required),
            telephone: this.fb.control('', Validators.required)
        })
        // ,
        // costGroup: this.fb.group({
        //     orderCost: this.fb.control(''),
        //     deliveryCost: this.fb.control('')
        // })
    });
  }

  saveOrder(): void {
      // let userId: number;
      // this.user$.subscribe (user => { userId = user.id; });
      this.order = {
        id: 5,
        deliveryDate: this.basketForm.controls['deliveryGroup'].get('deliveryDate').value,
        deliveryTime: this.basketForm.controls['deliveryGroup'].get('deliveryTime').value,
        deliveryAddress: this.basketForm.controls['addressGroup'].value,
        orderDate: new Date(),
        status: OrderStatus.OPEN,
        items: this.basketItems,
        userId: this.userId
      };
      this.basketService.saveOrder(this.order).subscribe(
        (value) => {
            this.snakBar.open('Order saved successfully. Delivery Date on: ' +
                                       value.deliveryDate + ' at: ' + value.deliveryTime );
            console.log('after post');
            console.dir(value);
        },
        (error) => {
          this.snakBar.open('Order failed with error: ' + error.toString());
          console.log('error');
          console.dir(error);
        }
      );
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

  toggleShowSteps() {
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
