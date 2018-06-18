import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as AuthActions from '../../auth/actions/auth.actions';
import * as fromAuth from '../../auth/reducers';
import * as fromRoot from '../../reducers';
import * as LayoutActions from '../actions/layout.actions';

@Component({
  selector: 'app-app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-layout>
      <app-sidenav [open]="showSidenav$ | async">

        <app-nav-item (navigate)="closeSidenav()" routerLink="/shop" icon="view_list" 
        hint="Find products">
          Browse Products
        </app-nav-item>
        
        <app-nav-item (navigate)="closeSidenav()" routerLink="/shop/basket" icon="shopping_cart" 
            hint="View basket">
                Basket
        </app-nav-item>

        <app-nav-item (navigate)="closeSidenav()" routerLink="/history" icon="history" 
        hint="View history">
            History
      </app-nav-item>

        <app-nav-item (navigate)="closeSidenav()" routerLink="/account" icon="account_circle" 
            hint="View account">
                Account
        </app-nav-item>

        <app-nav-item (navigate)="closeSidenav()" icon="perm_identity" >
          Sign In
        </app-nav-item>

        <app-nav-item (navigate)="logout()" *ngIf="loggedIn$ | async">
          Sign Out
        </app-nav-item>
      
        </app-sidenav>
     
      <app-toolbar (openMenu)="openSidenav()">
        OnWeb
      </app-toolbar>

      <router-outlet></router-outlet>
    </app-layout>
  `,
})

// <app-nav-item (navigate)="closeSidenav()" *ngIf="loggedIn$ | async" routerLink="/books/find" 
// icon="search" hint="Find your next book">
//   Browse Books
// </app-nav-item>


export class AppComponent {
  showSidenav$: Observable<boolean>;
  loggedIn$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    this.showSidenav$ = this.store.pipe(select(fromRoot.getShowSidenav));
    this.loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));

    const open  = window.indexedDB.open('onweb', 4);
    open.onupgradeneeded = function(event) {
        const db = event.target.result;
        console.log('****  onupgradeneeded   ******  creating objecstore');
        const store = db.createObjectStore('products', { keyPath: "id" });
        let tx = event.target.transaction;
        // let tx = db.transaction(['products'], "readwrite");
        const objectStore = tx.objectStore(['products'], 'readwrite');  
        // const index = store.createIndex('idIndex', 'id');
        console.log('****   onupgradeneeded  ******  objecstore created successfuly');
        
      };
      open.onsuccess = function (event) {
        const db = event.target.result;
        let tx = event.target.transaction;
        // const store = db.createObjectStore('products');
        console.log('****   onsuccess  ******  objecstore created successfuly');
    };
  }

  closeSidenav() {
    /**
     * All state updates are handled through dispatched actions in 'container'
     * components. This provides a clear, reproducible history of state
     * updates and user interaction through the life of our
     * application.
     */
    this.store.dispatch(new LayoutActions.CloseSidenav());
  }

  openSidenav() {
    this.store.dispatch(new LayoutActions.OpenSidenav());
  }

  logout() {
    this.closeSidenav();

    this.store.dispatch(new AuthActions.Logout());
  }
}
