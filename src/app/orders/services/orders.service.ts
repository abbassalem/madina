import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Order } from '../../shop/models/order.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class OrderService {

  orders: Array<Order>;

  constructor(private db: AngularFirestore) {
  }

  getOrders(): Observable<Array<Order>> {
    return null;
    // return this.http.get<Array<Order>>(`${this.endpoint}/orders`);
  }

}
