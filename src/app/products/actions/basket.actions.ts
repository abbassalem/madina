import { Action } from '@ngrx/store';
import { Product } from '../models/product.model';

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
}

export class AddProduct implements Action {
  readonly type = BasketActionTypes.AddProduct;

  constructor(public payload: Product) {}
}

export class AddProductSuccess implements Action {
  readonly type = BasketActionTypes.AddProductSuccess;

  constructor(public payload: Product) {}
}

export class AddProductFail implements Action {
  readonly type = BasketActionTypes.AddProductFail;

  constructor(public payload: Product) {}
}

export class RemoveProduct implements Action {
  readonly type = BasketActionTypes.RemoveProduct;

  constructor(public payload: Product) {}
}

export class RemoveProductSuccess implements Action {
  readonly type = BasketActionTypes.RemoveProductSuccess;

  constructor(public payload: Product) {}
}

export class RemoveProductFail implements Action {
  readonly type = BasketActionTypes.RemoveProductFail;

  constructor(public payload: Product) {}
}

export class Load implements Action {
  readonly type = BasketActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = BasketActionTypes.LoadSuccess;

  constructor(public payload: Product[]) {}
}

export class LoadFail implements Action {
  readonly type = BasketActionTypes.LoadFail;

  constructor(public payload: any) {}
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
  | LoadFail;
