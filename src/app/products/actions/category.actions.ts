import { Action } from '@ngrx/store';
import { Category } from '../models/category.model';

export enum CategoryActionTypes {
  Search = '[Category] Search',
  SearchComplete = '[Category] Search Complete',
  SearchError = '[Category] Search Error',
  Load = '[Category] Load',
  LoadComplete = '[Category] Load Complete',
  LoadError = '[Category] Load Error',
  Select = '[Category] Select',
  SelectComplete = '[Category] Select Complete',
  SelectError = '[Category] Select Error',
}

export class Search implements Action {
  readonly type = CategoryActionTypes.Search;
  constructor(public payload: string) {}
}

export class SearchComplete implements Action {
  readonly type = CategoryActionTypes.SearchComplete;
  constructor(public payload: Category[]) {}
}

export class SearchError implements Action {
  readonly type = CategoryActionTypes.SearchError;
  constructor(public payload: string) {}
}

export class Load implements Action {
  readonly type = CategoryActionTypes.Load;
  constructor() {}
}

export class LoadComplete implements Action {
  readonly type = CategoryActionTypes.LoadComplete;
  constructor(public payload: Category[]) {}
}

export class LoadError implements Action {
  readonly type = CategoryActionTypes.LoadError;
  constructor(public payload: string) {}
}

export class Select implements Action {
  readonly type = CategoryActionTypes.Select;
  constructor(public payload: number) {}
}

export class SelectComplete implements Action {
  readonly type = CategoryActionTypes.SelectComplete;
  constructor(public payload: number) {}
}

export class SelectError implements Action {
  readonly type = CategoryActionTypes.SelectError;
  constructor(public payload: string) {}
}

export type CategoryActionsUnion =
  | Load
  | LoadComplete
  | LoadError
  | Select
  | SelectComplete
  | SelectError
  | SearchComplete
  | SearchError
  | Search;

