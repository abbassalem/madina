import { Action } from '@ngrx/store';
import { BasketItem } from '../models/BasketItem.model';

export enum BasketActionTypes {
  AddBasketItem = '[Basket] Add BasketItem',
  AddBasketItemComplete = '[Basket] Add BasketItem Complete',
  AddBasketItemError = '[Basket] Add BasketItem Error',
  RemoveBasketItem = '[Basket] Remove BasketItem',
  RemoveBasketItemComplete = '[Basket] Remove BasketItem Complete',
  RemoveBasketItemError = '[Basket] Remove BasketItem Error',
  Load = '[Basket] Load',
  LoadComplete = '[Basket] Load Complete',
  LoadError = '[Basket] Load Error',
  Select = '[Basket] Select Basket Item',
  UpdateBasketItem = '[Basket] Update Basket Item',
  UpdateBasketItemComplete = '[Basket] Update Basket Item Complete',
  UpdateBasketItemError = '[Basket] Update Basket Item Error'
}

export class AddBasketItem implements Action {
  readonly type = BasketActionTypes.AddBasketItem;

  constructor(public payload: BasketItem) { }
}

export class AddBasketItemComplete implements Action {
  readonly type = BasketActionTypes.AddBasketItemComplete;
  constructor(public payload: BasketItem) { }
}

export class AddBasketItemError implements Action {
  readonly type = BasketActionTypes.AddBasketItemError;
  constructor(public payload: BasketItem) { }
}

export class RemoveBasketItem implements Action {
  readonly type = BasketActionTypes.RemoveBasketItem;
  constructor(public payload: number) { }
}

export class RemoveBasketItemComplete implements Action {
  readonly type = BasketActionTypes.RemoveBasketItemComplete;
  constructor(public payload: number) { }
}

export class RemoveBasketItemError implements Action {
  readonly type = BasketActionTypes.RemoveBasketItemError;
  constructor(public payload: number ) { }
}

export class Load implements Action {
  readonly type = BasketActionTypes.Load;
}

export class LoadComplete implements Action {
  readonly type = BasketActionTypes.LoadComplete;
  constructor(public payload: BasketItem[]) { }
}

export class LoadError implements Action {
  readonly type = BasketActionTypes.LoadError;
  constructor(public payload: any) { }
}

export class Select implements Action {
  readonly type = BasketActionTypes.Select;
  constructor(public payload: BasketItem) { }
}

export class UpdateBasketItem implements Action {
  readonly type = BasketActionTypes.UpdateBasketItem;
  constructor(public payload: BasketItem) { }
}

export class UpdateBasketItemComplete implements Action {
  readonly type = BasketActionTypes.UpdateBasketItemComplete;
  constructor(public payload: BasketItem) { }
}

export class UpdateBasketItemError implements Action {
  readonly type = BasketActionTypes.UpdateBasketItemError;
  constructor(public payload: string) { }
}

export type BasketActionsUnion =
  | AddBasketItem
  | AddBasketItemComplete
  | AddBasketItemError
  | RemoveBasketItem
  | RemoveBasketItemComplete
  | RemoveBasketItemError
  | Load
  | LoadComplete
  | LoadError
  | UpdateBasketItem
  | UpdateBasketItemComplete
  | UpdateBasketItemError
  | Select;
