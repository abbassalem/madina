import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../../shop/models/category.model';
import { environment } from '../../../environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductService {
  categories: Array<Category>;
  history: any;
  placedOrderSuccess = false;
  endpoint = environment.endpoint;

  constructor(private db: AngularFirestore) {

  }

   getCategories(): Observable<Array<Category>> {
    let cat = this.db.collection('categories');
    let data: Array<Category> = [] ;
    cat.get().pipe(
      map( snapshot => {
        snapshot.docs.map(doc => {
          const row: Category = {
              id: Number(doc.id), 
              name: doc.data().name, 
              description: doc.data().description,
              products: doc.data().products
          };
          data.push(row);
        });
      })
    );
    return of(data);
  }
}
