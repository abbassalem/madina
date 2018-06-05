import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Category } from '../../products/models/category.model';
import { Product } from '../../products/models/product.model';

@Injectable()
export class ProductService {
  
  categories: Array<Category>;
  history: any;
  placedOrderSuccess = false;
  
  url: string = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>(this.url);
  }

  getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(this.url);
  }
}
