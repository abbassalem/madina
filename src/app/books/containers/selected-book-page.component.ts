import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromBooks from '../reducers';
import * as CollectionActions from '../actions/collection.actions';
import { Book } from '../models/book';

@Component({
  selector: 'app-selected-book-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-book-detail
      [book]="book$ | async"
      [inCollection]="isSelectedBookInCollection$ | async"
      (add)="addToCollection($event)"
      (remove)="removeFromCollection($event)">
    </app-book-detail>
  `,
})
export class SelectedBookPageComponent {
  book$: Observable<Book>;
  isSelectedBookInCollection$: Observable<boolean>;

  constructor(private store: Store<fromBooks.State>) {
    this.book$ = store.pipe(select(fromBooks.getSelectedBook)) as Observable<Book>;
    this.isSelectedBookInCollection$ = store.pipe(
      select(fromBooks.isSelectedBookInCollection)
    );
  }

  addToCollection(book: Book) {
    this.store.dispatch(new CollectionActions.AddBook(book));
  }

  removeFromCollection(book: Book) {
    this.store.dispatch(new CollectionActions.RemoveBook(book));
  }
}
