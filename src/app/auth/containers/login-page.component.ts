import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Authenticate } from '../models/user';
import * as fromAuth from '../reducers/auth.reducer';
import * as AuthActions from '../actions/auth.actions';

@Component({
  selector: 'app-login-page',
  template: `
    <app-login-form
      (submitted)="onSubmit($event)">
    </app-login-form>
  `,
  styles: [],
})

// <app-login-form
// (submitted)="onSubmit($event)"
// [pending]="pending$ | async"
// [errorMessage]="error$ | async">
// </app-login-form>
export class LoginPageComponent implements OnInit {


  // TODO: for including pending and errors for loginpage
  // pending$ = this.store.pipe(select(fromAuth.getLoginPagePending));
  // error$ = this.store.pipe(select(fromAuth.getLoginPageError));

  constructor(private store: Store<fromAuth.State>) {}

  ngOnInit() {}

  onSubmit($event: Authenticate) {
    this.store.dispatch(new AuthActions.Login($event));
  }
}
