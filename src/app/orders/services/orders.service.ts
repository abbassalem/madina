import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { Order } from '../../shop/models/order.model';

@Injectable()
export class OrderService {

  orders: Array<Order>;
  endpoint = environment.endpoint;

  constructor(private http: HttpClient) {
  }

  getOrders(): Observable<Array<Order>> {
    return this.http.get<Array<Order>>(`${this.endpoint}/orders`);
  }

}
