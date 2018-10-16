import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromOrdersReducer from './orders.reducer';

export const ordersState = createFeatureSelector<fromOrdersReducer.OrderState>('orders');

export const getOrderState = ( (state: fromOrdersReducer.OrderState) => state);

export const getSelectedOrderId = (state: fromOrdersReducer.OrderState) => state.selectedOrderId;

export const getEntityById = (id: number) => createSelector(getAllOrders, orders => orders[id]);

export const {
  selectIds: getOrderIds,
  selectEntities: getOrderEntities,
  selectAll: getAllOrders,
  selectTotal: orderCount
} = fromOrdersReducer.adapter.getSelectors(ordersState);
