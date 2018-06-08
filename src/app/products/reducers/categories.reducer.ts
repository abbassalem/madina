import { createSelector, createFeatureSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Category } from '../models/category.model';
import { CategoryActionsUnion, CategoryActionTypes } from '../actions/category.actions';
import  * as fromAdapter from '../adapters/category.adapter';
import {getCategoryState} from './index';

export interface CategoryState extends EntityState<Category> {
  selectedCategoryId: number | null;
  selectedProductId: number | null;
}

export const initialState: CategoryState = fromAdapter.adapter.getInitialState({  selectedCategoryId: null, selectedProductId: null});

export function reducer(state = initialState, action: CategoryActionsUnion ): CategoryState {  
  switch (action.type) {
    case CategoryActionTypes.LoadComplete: {
      return fromAdapter.adapter.addMany(action.payload, state);
    }
    case CategoryActionTypes.SelectComplete: {
      return {...state, selectedCategoryId: action.payload};
    }
    default: {
      return state;
    }
  }
}

export const selectCategoryIds = createSelector(getCategoryState, fromAdapter.selectCategoryIds);
export const selectCategoryEntities = createSelector(getCategoryState, fromAdapter.selectCategoryEntities);
export const selectAllCategories = createSelector(getCategoryState, fromAdapter.selectAllCategories);
export const categoryCount = createSelector(getCategoryState, fromAdapter.categoryCount);

export const selectCategoryId = (state: CategoryState) => state.selectedCategoryId;
export const selectProductId = (state: CategoryState) => state.selectedProductId;

export const getSelectedCategory = createSelector(
  selectCategoryEntities,
  selectCategoryId,
  (entities, id) => entities[id]
);

export const getAllProductsBySelectedCategory = createSelector(
  getSelectedCategory,
  (state) => state.products
);

export const getSelectedProduct = createSelector(
  getAllProductsBySelectedCategory,
  selectProductId,
  (products, selectedId) => products.filter( product => product.id === selectedId )
);







