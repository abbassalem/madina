import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import { CategoryActionTypes, CategoryActionsUnion } from '../actions/category.actions';
import { Category } from '../models/category.model';
import { getCategoryEntities } from '.';

export interface CategoryState extends EntityState<Category> {
  selectedCategoryId: number | null;
  selectedProductId: number | null;
}

export function sortByCategory(ob1: Category, ob2: Category): number {
  return ob1.name.localeCompare(ob2.name);
}

export const adapter: EntityAdapter<Category> = createEntityAdapter<Category>({
   selectId: (category: Category) => category.id,
   sortComparer: sortByCategory,
 });

export const initialState: CategoryState = adapter.getInitialState({
  selectedCategoryId: null,
  selectedProductId: null
});

export function reducer(state = initialState, action: CategoryActionsUnion ): CategoryState {
  switch (action.type) {
    case CategoryActionTypes.LoadComplete: {
      return adapter.addMany(action.payload, state);
    }
    case CategoryActionTypes.Select: {
      return {...state, selectedCategoryId: action.payload};
    }

    case CategoryActionTypes.SelectProduct: {
      return {...state, selectedProductId: action.payload};
    }
    
    default: {
      return state;
    }
  }
}











