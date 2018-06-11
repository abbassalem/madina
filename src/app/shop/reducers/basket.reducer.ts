import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { BasketItem } from '../models/basketItem.model';
import { BasketActionsUnion, BasketActionTypes } from '../actions/basket.actions';

export interface BasketState extends EntityState<BasketItem> {
  selectedBasketItemId: number | null;
}

export function sortByBasket(ob1: BasketItem, ob2: BasketItem): number {
  let result = 0;
  if (ob1.id > ob2.id) {
    result = 1;
  } else if (ob1.id < ob2.id) {
    result = -1;
  }
  return result;
}

export const adapter: EntityAdapter<BasketItem> = createEntityAdapter<BasketItem>({
   selectId: (basket: BasketItem) => basket.id,
   sortComparer: sortByBasket,
 });
export const initialState: BasketState = adapter.getInitialState({
  selectedBasketItemId: null,
});

export function reducer(state = initialState, action: BasketActionsUnion): BasketState {
  switch (action.type) {
    case BasketActionTypes.LoadSuccess: {
      return adapter.addMany(action.payload, state);
    }
    // case BasketActionTypes.AddProductSuccess:
    // case BasketActionTypes.RemoveProductFail:
    // {
    //   if ( state.ids.indexOf(action.payload.id) > -1 ) {
    //     return state;
    //   } else {
    //     return fromAdapter.adapter.addOne(action.payload, state);
    //   }
      // {
      //   ...state,
      //   ids: [...state.ids, action.payload.id],
      // };
    // }
    case BasketActionTypes.RemoveProductSuccess:
    case BasketActionTypes.AddProductFail: {
      return adapter.removeOne(action.payload.id, state);
      // return {
      //   ...state,
      //   ids: state.ids.filter(id => id !== action.payload.id),
      // };
    }
    case BasketActionTypes.Select: {
      return {
        ...state,
        selectedBasketItemId: action.payload.id
      };
    }

    default: {
      return state;
    }
  }
}

export const getBasketState = ( (state: BasketState) => state);
export const getSelectedBasketItemId = (state: BasketState) => state.selectedBasketItemId;
