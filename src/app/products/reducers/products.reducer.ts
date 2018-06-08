import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Product } from '../models/product.model';
import { ProductActionsUnion, ProductActionTypes } from '../actions/product.actions';
import {
  BasketActionsUnion,
  BasketActionTypes,
} from '../actions/basket.actions';
import { Category } from '../models/category.model';


export interface State extends EntityState<Product> {
  selectedCategoryId: number | null;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: (product: Product) => product.id,
  sortComparer: false,
});


export const initialState: State = adapter.getInitialState({
  selectedCategoryId: null
});

export const {
  selectIds: getProductIds,
  selectEntities: getProductEntities,
  selectAll: getAllProducts,
  selectTotal: getTotalProducts,
} = adapter.getSelectors();

export function reducer(
  state = initialState,
  action: ProductActionsUnion | BasketActionsUnion
): State {
  switch (action.type) {
    // case ProductActionTypes.SearchComplete: {
    //   return adapter.addMany(action.payload, {
    //     ...state,
    //     selectedProductId: state.selectedCategoryId,
    //   });
    // }

    // case ProductActionTypes.Load: {
    //   return adapter.addOne(action.payload, {
    //     ...state,
    //     selectedProductId: state.selectedCategoryId,
    //   });
    // }

    // case ProductActionTypes.SelectProduct: {
    //   return {
    //     ...state,
    //     selectedCategoryId: action.payload
    //   };
    // }

    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selectedCategoryId;
export const getIds = (state: State) => state.ids;
export const getLoaded = (state: State) => state.entities;
