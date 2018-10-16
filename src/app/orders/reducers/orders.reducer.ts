import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import { OrderActionTypes, OrderActionsUnion } from '../actions/orders.actions';
import { Order } from '../../shop/models/order.model';

export interface OrderState extends EntityState<Order> {
  selectedOrderId: number | null;
}

export function sortByOrder(ob1: Order, ob2: Order): number {
   const value = ob1.id > ob2.id ? 1 : 0;
   return value;
}

export const adapter: EntityAdapter<Order> = createEntityAdapter<Order>({
   selectId: (order: Order) => order.id,
   sortComparer: sortByOrder
 });

export const initialState: OrderState = adapter.getInitialState({
  selectedOrderId: null
});

export function reducer(state = initialState, action: OrderActionsUnion): OrderState {
  switch (action.type) {
    case OrderActionTypes.LoadComplete: {
      return adapter.addMany(action.payload, state);
    }

    case OrderActionTypes.Select: {
      return {
        ...state,
        selectedOrderId: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

