import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Category } from '../../products/models/category.model';

@Injectable()
export class ProductService {
  
  categories: Array<Category>;
  history: any;
  placedOrderSuccess = false;
  
  url: string = "http://localhost:3000/api/categories";

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<Array<Category>> {
    return this.http.get<Array<Category>>(this.url);
  }
}
