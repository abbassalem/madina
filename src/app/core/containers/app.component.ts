import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as AuthActions from '../../auth/actions/auth.actions';
import * as fromAuth from '../../auth/reducers';
import * as fromRoot from '../../reducers';
import * as LayoutActions from '../actions/layout.actions';
import * as ConfigActions from '../actions/app-config.actions';

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

        <app-nav-item (navigate)="closeSidenav()"  *ngIf="!(loggedIn$ | async)" routerLink="/login" icon="perm_identity" >
          Sign In
        </app-nav-item>

        <app-nav-item (navigate)="logout()" *ngIf="loggedIn$ | async"  icon="account_circle">
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


export class AppComponent {
  showSidenav$: Observable<boolean>;
  loggedIn$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.showSidenav$ = this.store.pipe(select(fromRoot.getShowSidenav));
    this.loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));
  }

  closeSidenav() {
    this.store.dispatch(new LayoutActions.CloseSidenav());
    this.store.dispatch(new ConfigActions.LoadDeliveryTimes());
  }

  openSidenav() {
    this.store.dispatch(new LayoutActions.OpenSidenav());
  }

  logout() {
    this.closeSidenav();
    this.store.dispatch(new AuthActions.Logout());
  }
}
