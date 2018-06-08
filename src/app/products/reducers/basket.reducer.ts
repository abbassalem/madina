import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { BasketItem } from '../models/basketItem.model';
import { BasketActionsUnion, BasketActionTypes } from '../actions/basket.actions';
import * as fromAdapter from '../adapters/basket.adapter';
import {getBasketState} from './index';
import './index';

export interface BasketState extends EntityState<BasketItem> {
  selectedBasketItemId: number | null;
}

export const initialState: BasketState = fromAdapter.adapter.getInitialState({
  selectedBasketItemId: null,
});


export function reducer(state = initialState, action: BasketActionsUnion): BasketState {
  switch (action.type) {
    case BasketActionTypes.LoadSuccess: {
      return fromAdapter.adapter.addMany(action.payload, state);
    }
    case BasketActionTypes.AddProductSuccess:
    case BasketActionTypes.RemoveProductFail:
    {
      if ( state.ids.indexOf(action.payload.id) > -1 ) {
        return state;
      } else {
        return fromAdapter.adapter.addOne(action.payload, state); 
      }
      // {
      //   ...state,
      //   ids: [...state.ids, action.payload.id],
      // };
    }
    case BasketActionTypes.RemoveProductSuccess:
    case BasketActionTypes.AddProductFail: {
      return fromAdapter.adapter.removeOne(action.payload.id, state);
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

export const selectBasketItemIds = createSelector(getBasketState, fromAdapter.selectBasketItemIds);
export const selectBasketItemEntities = createSelector(getBasketState, fromAdapter.selectBasketItemEntities);
export const selectAllBasketItems = createSelector(getBasketState, fromAdapter.selectAllBasketItems);
export const categoryCount = createSelector(getBasketState, fromAdapter.basketItemCount);

export const getSelectBasketItemId = (state: BasketState) => state.selectedBasketItemId;

export const selectBasketItem = createSelector(
  selectBasketItemEntities,
  getSelectBasketItemId,
  (entities, id) => entities[id]
); 