import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
  AuthActionTypes,
  Login,

  LoginComplete, LoginError
} from '../actions/auth.actions';
import { AuthService } from '../services/auth.service';


@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  // TODO:
  // @Effect()
  // login$ = this.actions$.pipe(
  //   ofType<Login>(AuthActionTypes.Login),
  //   switchMap( action => this.authService.login(action.payload).pipe(
  //       map ( users => {
  //           return new LoginComplete(users[0]);
  //       }), 
  //       catchError(error => of(new LoginError(error)))
  //     )
  //   )
  // );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
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
}
