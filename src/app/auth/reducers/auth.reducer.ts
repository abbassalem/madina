import { AuthActionsUnion, AuthActionTypes } from './../actions/auth.actions';
import { User } from '../models/user';
import { createFeatureSelector } from '@ngrx/store';

export interface State {
  loggedIn: boolean;
  user: User ;
}

export const initialState: State = {
  loggedIn: false,
  user: null,
};

export const selectAuthState = createFeatureSelector<State>('auth');

export function reducer(state = initialState, action: AuthActionsUnion): State {
  switch (action.type) {
    case AuthActionTypes.LoginComplete: {
      // console.dir(action.payload);
      return {
        ...state,
        loggedIn: true,
        user: action.payload,
      };
    }

    case AuthActionTypes.Logout: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getUser = (state: State) => state.user;
