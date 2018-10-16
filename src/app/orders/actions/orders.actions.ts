import { Action } from '@ngrx/store';
import { Order } from '../../shop/models/order.model';

export enum OrderActionTypes {
  Load = '[Order] Load',
  LoadComplete = '[Order] Load Complete',
  LoadError = '[Order] Load Error',
  Select = '[Order] Select Order Item',
  Copy = '[Order] Copy',
  CopyComplete = '[Order] Copy Complete',
  CopyError = '[Order] Copy Error',
}
export class Load implements Action {
  readonly type = OrderActionTypes.Load;
}

export class LoadComplete implements Action {
  readonly type = OrderActionTypes.LoadComplete;
  constructor(public payload: Order[]) { }
}

export class LoadError implements Action {
  readonly type = OrderActionTypes.LoadError;
  constructor(public payload: any) { }
}

export class Select implements Action {
  readonly type = OrderActionTypes.Select;
  constructor(public payload: number) { }
}

export class Copy implements Action {
  readonly type = OrderActionTypes.Copy;
  constructor(public payload: Order) { }
}

export class CopyComplete implements Action {
  readonly type = OrderActionTypes.CopyComplete;
  constructor(public payload: Order) { }
}

export class CopyError implements Action {
  readonly type = OrderActionTypes.CopyError;
  constructor(public payload: any) { }
}

export type OrderActionsUnion =
  | Load
  | LoadComplete
  | LoadError
  | Select
  | Copy
  | CopyComplete
  | CopyError;
