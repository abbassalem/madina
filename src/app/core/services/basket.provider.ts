// import {Injectable, OnInit} from '@angular/core';
// import  'rxjs';
// import {Order} from '../models/order.model';
// import {OrderLine} from '../models/orderline.model';
// import {BehaviorSubject} from 'rxjs/BehaviorSubject';
// import {HttpClient} from '@angular/common/http';

// @Injectable()
// export class BasketProvider implements OnInit{

//   endpoint: string = 'http://localhost:3000/api/orders';
//   order: Order;
//   order$: BehaviorSubject<Order> = new BehaviorSubject<Order>(this.order);
//   userId: string;
//   history: Order[];
//   orders: Order[];
//   placedOrderSuccess = false;

//   constructor(private http: HttpClient) {
//   }

//   // ngOnInit():  void {
//   //   // this.orders = (<any>data).orders;
//   //   this.http.get(this.endpoint).map( (data) => {
//   //     // console.log('Data from server');
//   //     // console.dir(data);
//   //     return data.json();
//   //   }).subscribe( (v) => {
//   //     this.orders = v;
//   //   })
//   // }

//   ngOnInit(): void {

//     // TODO: change to use json-server
//     // if (firebase.database().ref('/users').key) {
//     //   firebase.database().ref().push('/users');
//     //   firebase.database().ref('/users/' + this.userId).once('value').then(function(snapshot) {
//     //     console.log('username');
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


//   saveOrder(): void {
//     console.log('calling saveOrder()');
//     console.dir(this.order);
//     this.http.post(this.endpoint, this.order).subscribe(
//       (value) => {
//         console.log('after post');
//         console.dir(value);
//         console.log('order array = ');
//         console.dir(this.orders);
//       },
//       (error) => {
//         console.log('error');
//         console.dir(error);
//       }
//     );
//   }

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


//   deleteOrderLine(line: OrderLine): void {
//     const foundIndex: number  = this.checkProductExits(line.id);
//     if ( foundIndex !== -1) {
//       this.order.orderLines.splice(foundIndex, 1);
//       this.order$.next(this.order);
//       this.order.amount -=  line.quantity * line.product.price;
//     }
//   }

//   editOrderLine(currentOrderLine: OrderLine, newOrderLine: OrderLine): void {

//     const currentAmount = currentOrderLine.amount;
//     currentOrderLine.quantity = newOrderLine.quantity;
//     currentOrderLine.amount = newOrderLine.amount;
//     currentOrderLine.product.quantity = newOrderLine.quantity;
//     const result = +(parseFloat( (Math.round(currentOrderLine.quantity * currentOrderLine.product.price * 100) / 100).toString()).toFixed(2));
//     this.order.amount = this.order.amount - currentAmount +  result;
//     this.order$.next(this.order);
//   }

//   private checkProductExits(id: number): number {
//     let foundIndex = -1;
//     for (let i = 0; i <  this.order.orderLines.length; i++) {
//       if ( this.order.orderLines[i].id === id) {
//         foundIndex = i;
//         break;
//       }
//     }
//     return foundIndex;
//   }

//   // ngOnInit(): void {
//   //   if (firebase.database().ref('/users').key) {
//   //     firebase.database().ref().push('/users');
//   //     firebase.database().ref('/users/' + this.userId).once('value').then(function(snapshot) {
//   //       console.log('username');
//   //       console.log(snapshot.val().s);
//   //       firebase.database().ref().push('/orders')
//   //     })
//   //   };
//   // }

//   // addOrderLine(line: OrderLine): void {
//   //   this.order.amount += +(parseFloat( (Math.round(line.quantity * line.product.price * 100) / 100).toString()).toFixed(2));
//   //   this.order.orderLines.push(line);
//   //   this.order$.next(this.order);
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

//   // private checkProductExits(id: number): number {
//   //   let foundIndex = -1;
//   //   for (let i = 0; i <  this.order.orderLines.length; i++) {
//   //     if ( this.order.orderLines[i].id === id) {
//   //       foundIndex = i;
//   //       break;
//   //     }
//   //   }
//   //   return foundIndex;
//   // }

// }


