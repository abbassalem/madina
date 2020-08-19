import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../../shop/models/order.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';


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

    // if (this.db.collection('/users').ref) {
      // this.db.collection('users').add(users');

    //   firebase.database().ref('/users/' + this.userId).once('value').then(function(snapshot) {
    //     console.log('email');
    //     console.log(snapshot.val().s);
    //     firebase.database().ref().push('/orders')
    //   })
    // };
  }

  // saveOrder() {
  //   const orderKey = firebase.database().ref('/users/' + firebase.auth().currentUser.uid  + '/orders').push(this.order).then(
  //     (success) => {
  //       console.log('after save');
  //       console.dir(success);
  //       this.order = {id: 0, orderDate: new Date(), amount: 0, orderLines: new Array<OrderLine>(), delivered: false};
  //       this.order$.next({id: 0, orderDate: new Date(), amount: 0, orderLines: new Array<OrderLine>(), delivered: false});
  //       this.placedOrderSuccess = true;
  //     },
  //     (error) => {
  //     }
  //   );
    
  //   function productAlreadyAddedToBasket(): void {
  //     for ( let catIndex = 0; catIndex < self.categories.length; catIndex++) {
  //       const cat = self.categories[catIndex];
  //       for ( let prodIndex = 0; prodIndex < cat.products.length; prodIndex++) {
  //         cat.products[prodIndex].addedToBasket = false;
  //       }
  //     }
  //   }
  // }

}
