import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order, OrderStatus } from '../../shop/models/order.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/auth/models/user';


@Injectable()
export class BasketService implements OnInit {

  order: Order;
  order$: BehaviorSubject<Order> = new BehaviorSubject<Order>(this.order);
  userId: string;
  history: Order[];
  orders: Order[];
  placedOrderSuccess = false;

  constructor(private db: AngularFirestore) {
  }

  ngOnInit(): void {
  }

  saveOrder(order: Order) {
    //  + firebase.auth().currentUser.uid
    return this.db.collection('orders').add(this.order);
    
  //   function productAlreadyAddedToBasket(): void {
  //     for ( let catIndex = 0; catIndex < self.categories.length; catIndex++) {
  //       const cat = self.categories[catIndex];
  //       for ( let prodIndex = 0; prodIndex < cat.products.length; prodIndex++) {
  //         cat.products[prodIndex].addedToBasket = false;
  //       }
  //     }
  //   }
 }

}
