import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Order } from '../../shop/models/order.model';
import { environment } from '../../../environments/environment';


@Injectable()
export class BasketService implements OnInit {

  endpoint =  environment.endpoint;
  order: Order;
  order$: BehaviorSubject<Order> = new BehaviorSubject<Order>(this.order);
  userId: string;
  history: Order[];
  orders: Order[];
  placedOrderSuccess = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit():  void {
    // this.http.get(this.endpoint).pipe( map ( (data) => {
    //   return data.json();
    // }).subscribe( (v) => {
    //   this.orders = v;
    // })
    // );
  }

//   ngOnInit(): void {
//     // TODO: change to use json-server
//     // if (firebase.database().ref('/users').key) {
//     //   firebase.database().ref().push('/users');
//     //   firebase.database().ref('/users/' + this.userId).once('value').then(function(snapshot) {
//     //     console.log('email');
//     //     console.log(snapshot.val().s);
//     //     firebase.database().ref().push('/orders')
//     //   })
//     // };
//   }

//   // saveOrder() {
//     // const orderKey = firebase.database().ref('/users/' + firebase.auth().currentUser.uid  + '/orders').push(this.order).then(
//     //   (success) => {
//     //     console.log('after save');
//     //     console.dir(success);
//     //     this.order = {id: 0, orderDate: new Date(), amount: 0, orderLines: new Array<OrderLine>(), delivered: false};
//     //     this.order$.next({id: 0, orderDate: new Date(), amount: 0, orderLines: new Array<OrderLine>(), delivered: false});
//     //     this.placedOrderSuccess = true;
//     //   },
//     //   (error) => {
//     //   }
//     // );
//     //
//     // function productAlreadyAddedToBasket(): void {
//     //   for ( let catIndex = 0; catIndex < self.categories.length; catIndex++) {
//     //     const cat = self.categories[catIndex];
//     //     for ( let prodIndex = 0; prodIndex < cat.products.length; prodIndex++) {
//     //       cat.products[prodIndex].addedToBasket = false;
//     //     }
//     //   }
//     // }
//   // }


  saveOrder(): void {
    console.log('calling saveOrder()');
    console.dir(this.order);
    this.http.post(this.endpoint+ '/orders', this.order).subscribe(
      (value) => {
        console.log('after post');
        console.dir(value);
        console.log('order array = ');
        console.dir(this.orders);
      },
      (error) => {
        console.log('error');
        console.dir(error);
      }
    );
  }

//   addOrderLine(orderLine:OrderLine): void {
//      orderLine.id = orderLine.product.id;
//      if(!this.order) {
//        this.order = {
//          id: null,
//          orderDate: new Date(),
//          amount: 0,
//          orderLines: new Array<OrderLine>(),
//          delivered: false
//        };
//      }
//     this.order.amount += orderLine.amount;
//     this.order.orderLines.push(orderLine);
//     this.order$.next(this.order);
//   }


//   // ngOnInit(): void {
//   //   if (firebase.database().ref('/users').key) {
//   //     firebase.database().ref().push('/users');
//   //     firebase.database().ref('/users/' + this.userId).once('value').then(function(snapshot) {
//   //       console.log('email');
//   //       console.log(snapshot.val().s);
//   //       firebase.database().ref().push('/orders')
//   //     })
//   //   };
//   // }

//   // saveOrder() {
//   //   const self = this;
//   //   const orderKey = firebase.database().ref('/users/' + firebase.auth().currentUser.uid  + '/orders').push(this.order).then(
//   //     (success) => {
//   //       console.log('after save');
//   //       console.dir(success);
//   //       this.order = {id: 0, orderDate: new Date().getTime(), amount: 0, orderLines: new Array<OrderLine>(), delivered: false};
//   //       this.order$.next({id: 0, orderDate: new Date().getTime(), amount: 0, orderLines: new Array<OrderLine>(), delivered: false});
//   //       productAlreadyAddedToBasket();
//   //       this.placedOrderSuccess = true;
//   //     },
//   //     (error) => {
//   //     }
//   //   );
//   //   function productAlreadyAddedToBasket(): void {
//   //     for ( let catIndex = 0; catIndex < self.categories.length; catIndex++) {
//   //       const cat = self.categories[catIndex];
//   //       for ( let prodIndex = 0; prodIndex < cat.products.length; prodIndex++) {
//   //         cat.products[prodIndex].addedToBasket = false;
//   //       }
//   //     }
//   //   }
//   // }

//   // updateOrder() {
//     // const ordersRef  = <Reference>firebase.database().ref('/users/' + firebase.auth().currentUser.uid  + '/orders');
//     // const orderRef  = <Reference>firebase.database().ref('/users/' + firebase.auth().currentUser.uid  + '/orders');
//     // ordersRef.update({amount: 450});
//   // }

//   // getOrders (): any {
//     // const children  =  firebase.database().ref('/users/' + firebase.auth().currentUser.uid  + '/orders');
//     // firebase.database().ref('/users/' + firebase.auth().currentUser.uid  + '/orders').on('value', (snaphot) => {
//     //    children = snaphot.val();
//     // });
//     // return children;
//   // }
//   // deleteOrderLine(line: OrderLine): void {
//   //   const foundIndex: number  = this.checkProductExits(line.id);
//     // if ( foundIndex !== -1) {
//     //   this.order.orderLines.splice(foundIndex, 1);
//     //   this.order$.next(this.order);
//     //   this.order.amount -=  line.quantity * line.product.price;
//     // }
//   // }
//   // editOrderLine(line: OrderLine): void {
//   //   const prevAmount = line.amount;
//     // this.dialogService.confirmProduct(line).subscribe( (orderLine: OrderLine) => {
//     //   line.quantity = orderLine.quantity;
//     //   line.amount = orderLine.amount;
//     //   const result = +(parseFloat( (Math.round(line.quantity * line.product.price * 100) / 100).toString()).toFixed(2));
//     //   this.order.amount = this.order.amount - prevAmount +  result;
//     //   this.order$.next(this.order);
//     // });
//   // }

//   // getHistory(): void {
//   //   let path: string;
//   //   this.loginService.user.subscribe( (loggedUser) => {
//   //     this.userId = loggedUser.uid;
//   //     path = '/users/' + this.userId + '/orders';
//   //     this.afdb.list(path).subscribe( (items) => {
//   //       this.history = items;
//   //     });
//   //   });
//   // }


}

