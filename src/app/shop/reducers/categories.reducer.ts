import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { CategoryActionsUnion, CategoryActionTypes } from '../actions/category.actions';
import { Category } from '../models/category.model';

export interface CategoryState extends EntityState<Category> {
  isLoaded: boolean | null;
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
  isLoaded: false,
  selectedCategoryId: null,
  selectedProductId: null
});

export function reducer(state = initialState, action: CategoryActionsUnion ): CategoryState {
  switch (action.type) {
    case CategoryActionTypes.LoadComplete: {
      state.isLoaded = true;
      return adapter.addMany(action.payload, state);
    }
    case CategoryActionTypes.Select: {
      return {...state, selectedCategoryId: action.payload};
    }

    case CategoryActionTypes.SelectProduct: {
      return {...state, selectedProductId: action.payload};
    }

    case CategoryActionTypes.UpdateProductQuantity: {
      const catId = state.selectedCategoryId;
      let category = state.entities[catId];
      const productIndex = category.products.findIndex(prod => prod.id === state.selectedProductId);
      category.products[productIndex].quantity = action.payload; 
      return adapter.updateOne({id: catId, changes: category}, state);
    }
    default: {
      return state;
    }
  }
}











