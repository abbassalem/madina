import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../shop/models/category.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProductService {
  categories: Array<Category>;
  history: any;
  placedOrderSuccess = false;
  endpoint = environment.endpoint;

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>(`${this.endpoint}/categories`);
  }
}
