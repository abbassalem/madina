import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import {
  AuthActionTypes,
  Login,
  LoginError,
  LoginComplete,
} from '../actions/auth.actions';
import { Authenticate, User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.Login),
    map(action => action.payload),
    exhaustMap((auth: Authenticate) =>
      this.authService
        .login(auth)
        .pipe(
          map( (users: User[]) => {
            const user = users[0];
            return new LoginComplete({ user});
          }),
          catchError(error => of(new LoginError(error)))
        )
    )
  );

  @Effect({ dispatch: false })
  LoginComplete$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginComplete),
    tap(() => this.router.navigate(['/shop/basket']))
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(AuthActionTypes.LoginRedirect, AuthActionTypes.Logout),
    tap(authed => {
      this.router.navigate(['/login']);
    })
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
