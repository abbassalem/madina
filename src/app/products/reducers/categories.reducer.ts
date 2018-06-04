import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Category } from '../models/category.model';
import { CategoryActionsUnion, CategoryActionTypes } from '../actions/category.actions';


export interface State extends EntityState<Category> {
  selectedCategoryId: number | null;
}

export const adapter: EntityAdapter<Category> = createEntityAdapter<Category>({
  selectId: (category: Category) => category.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedCategoryId: null,
});

export function reducer(
  state = initialState,
  action: CategoryActionsUnion): State {
  switch (action.type) {
    case CategoryActionTypes.LoadComplete: {
      return adapter.addMany(action.payload,state);
    }
    case CategoryActionTypes.Load: {
      return adapter.addOne(action.payload, state);
    }
    case CategoryActionTypes.Select: {
      return {
        ...state,
        selectedCategoryId: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selectedCategoryId;
