import { Action } from '@ngrx/store';
import { BasketItem } from '../models/BasketItem.model';

export enum BasketActionTypes {
  AddProduct = '[Basket] Add Product',
  AddProductComplete = '[Basket] Add Product Complete',
  AddProductError = '[Basket] Add Product Error',
  RemoveProduct = '[Basket] Remove Product',
  RemoveProductComplete = '[Basket] Remove Product Complete',
  RemoveProductError = '[Basket] Remove Product Error',
  Load = '[Basket] Load',
  LoadComplete = '[Basket] Load Complete',
  LoadError = '[Basket] Load Error',
  Select = '[Basket] Select Basket Item',
  UpdateBasketItem = '[Basket] Update Basket Item',
  UpdateBasketItemComplete = '[Basket] Update Basket Item Complete',
  UpdateBasketItemError = '[Basket] Update Basket Item Error'
}

export class AddProduct implements Action {
  readonly type = BasketActionTypes.AddProduct;

  constructor(public payload: BasketItem) { }
}

export class AddProductComplete implements Action {
  readonly type = BasketActionTypes.AddProductComplete;
  constructor(public payload: BasketItem) { }
}

export class AddProductError implements Action {
  readonly type = BasketActionTypes.AddProductError;
  constructor(public payload: BasketItem) { }
}

export class RemoveProduct implements Action {
  readonly type = BasketActionTypes.RemoveProduct;
  constructor(public payload: number) { }
}

export class RemoveProductComplete implements Action {
  readonly type = BasketActionTypes.RemoveProductComplete;
  constructor(public payload: number) { }
}

export class RemoveProductError implements Action {
  readonly type = BasketActionTypes.RemoveProductError;
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
  | AddProduct
  | AddProductComplete
  | AddProductError
  | RemoveProduct
  | RemoveProductComplete
  | RemoveProductError
  | Load
  | LoadComplete
  | LoadError
  | UpdateBasketItem
  | UpdateBasketItemComplete
  | UpdateBasketItemError
  | Select;
