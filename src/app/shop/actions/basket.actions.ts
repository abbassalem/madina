import { Action } from '@ngrx/store';
import { BasketItem } from '../models/BasketItem.model';

export enum BasketActionTypes {
  AddProduct = '[Basket] Add Product',
  AddProductSuccess = '[Basket] Add Product Success',
  AddProductFail = '[Basket] Add Product Fail',
  RemoveProduct = '[Basket] Remove Product',
  RemoveProductSuccess = '[Basket] Remove Product Success',
  RemoveProductFail = '[Basket] Remove Product Fail',
  Load = '[Basket] Load',
  LoadSuccess = '[Basket] Load Success',
  LoadFail = '[Basket] Load Fail',
  Select = '[Basket] Select Basket Item'
}

export class AddProduct implements Action {
  readonly type = BasketActionTypes.AddProduct;

  constructor(public payload: BasketItem) { }
}

export class AddProductSuccess implements Action {
  readonly type = BasketActionTypes.AddProductSuccess;
  constructor(public payload: BasketItem) { }
}

export class AddProductFail implements Action {
  readonly type = BasketActionTypes.AddProductFail;
  constructor(public payload: BasketItem) { }
}

export class RemoveProduct implements Action {
  readonly type = BasketActionTypes.RemoveProduct;
  constructor(public payload: BasketItem) { }
}

export class RemoveProductSuccess implements Action {
  readonly type = BasketActionTypes.RemoveProductSuccess;
  constructor(public payload: BasketItem) { }
}

export class RemoveProductFail implements Action {
  readonly type = BasketActionTypes.RemoveProductFail;
  constructor(public payload: BasketItem ) { }
}

export class Load implements Action {
  readonly type = BasketActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = BasketActionTypes.LoadSuccess;
  constructor(public payload: BasketItem[]) { }
}

export class LoadFail implements Action {
  readonly type = BasketActionTypes.LoadFail;
  constructor(public payload: any) { }
}

export class Select implements Action {
  readonly type = BasketActionTypes.Select;
  constructor(public payload: BasketItem) { }
}

export type BasketActionsUnion =
  | AddProduct
  | AddProductSuccess
  | AddProductFail
  | RemoveProduct
  | RemoveProductSuccess
  | RemoveProductFail
  | Load
  | LoadSuccess
  | LoadFail
  | Select;
