import { Action } from '@ngrx/store';
import { User, Authenticate } from '../models/user';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  Logout = '[Auth] Logout',
  LoginComplete = '[Auth] Login Success',
  LoginError = '[Auth] Login Failure',
  LoginRedirect = '[Auth] Login Redirect',
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;
  constructor(public payload: Authenticate) {}
}

export class LoginComplete implements Action {
  readonly type = AuthActionTypes.LoginComplete;
  constructor(public payload: User) {}
}

export class LoginError implements Action {
  readonly type = AuthActionTypes.LoginError;
  constructor(public payload: string) {}
}

export class LoginRedirect implements Action {
  readonly type = AuthActionTypes.LoginRedirect;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export type AuthActionsUnion =
  | Login
  | LoginComplete
  | LoginError
  | LoginRedirect
  | Logout;
