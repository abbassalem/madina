import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../../shop/models/category.model';

@Injectable()
export class ProductService {
  categories: Array<Category>;
  history: any;
  placedOrderSuccess = false;

  constructor(private db: AngularFirestore) {

  }

  getCategories(): Observable<Array<Category>> {
    let catRef = this.db.collection('categories');
    console.log('getCategories');
    let data: Array<Category> = [] ;
    console.dir(catRef.snapshotChanges);
    catRef.snapshotChanges().pipe(
      map( snapshot => {
        snapshot.map(doc => {
          const row: Category = {
              id: Number(doc.payload.doc.id), 
              name: doc.payload.doc.get('name'), 
              description: doc.payload.doc.get('description'),
              products: doc.payload.doc.get('products')
          };
          console.dir(row);
          data.push(row);
        });
      })
    );
    console.dir(data);
    return of(data);
  }
}
