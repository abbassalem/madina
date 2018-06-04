import { Action } from '@ngrx/store';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';

export enum ProductActionTypes {
  Search = '[Product] Search',
  SearchComplete = '[Product] Search Complete',
  SearchError = '[Product] Search Error',
  Load = '[Product] Load',
  LoadComplete = '[Product] Load Complete',
  LoadError = '[Product] Load Error',
  Select = '[Product] Select',
}

export class Search implements Action {
  readonly type = ProductActionTypes.Search;

  constructor(public payload: string) {}
}

export class SearchComplete implements Action {
  readonly type = ProductActionTypes.SearchComplete;

  constructor(public payload: Product[]) {}
}

export class SearchError implements Action {
  readonly type = ProductActionTypes.SearchError;

  constructor(public payload: string) {}
}

export class Load implements Action {
  readonly type = ProductActionTypes.Load;

  constructor(public payload: Product) {}
}

export class LoadComplete implements Action {
  readonly type = ProductActionTypes.LoadComplete;

  constructor(public payload: Category[]) {}
}

export class LoadError implements Action {
  readonly type = ProductActionTypes.LoadError;

  constructor(public payload: string) {}
}

export class Select implements Action {
  readonly type = ProductActionTypes.Select;

  constructor(public payload: string) {}
}

export type ProductActionsUnion =
  | Search
  | SearchComplete
  | SearchError
  | Load
  | Select;
