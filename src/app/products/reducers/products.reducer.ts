import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Product } from '../models/product.model';
import { ProductActionsUnion, ProductActionTypes } from '../actions/product.actions';
import {
  BasketActionsUnion,
  BasketActionTypes,
} from '../actions/basket.actions';


export interface State extends EntityState<Product> {
  selectedProductId: string | null;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: (product: Product) => product.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedProductId: null,
});

export function reducer(
  state = initialState,
  action: ProductActionsUnion | BasketActionsUnion
): State {
  switch (action.type) {
    case ProductActionTypes.SearchComplete:
    case BasketActionTypes.LoadSuccess: {
      return adapter.addMany(action.payload, {
        ...state,
        selectedProductId: state.selectedProductId,
      });
    }

    case ProductActionTypes.Load: {
      return adapter.addOne(action.payload, {
        ...state,
        selectedProductId: state.selectedProductId,
      });
    }

    case ProductActionTypes.Select: {
      return {
        ...state,
        selectedProductId: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selectedProductId;
export const getIds = (state: State) => state.ids;
export const getLoaded = (state: State) => state.entities;
