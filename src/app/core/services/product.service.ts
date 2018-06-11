import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Category } from '../../shop/models/category.model';
import { Product } from '../../shop/models/product.model';

@Injectable()
export class ProductService {
  categories: Array<Category>;
  history: any;
  placedOrderSuccess = false;
  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(`${this.apiUrl}/products`);
  }

  getCategories(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>(`${this.apiUrl}/categories`);
  }
}
