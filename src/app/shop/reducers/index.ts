import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromCategories from './categories.reducer';
import * as fromBasket from './basket.reducer';
import * as fromRoot from '../../reducers';
import { EntityState } from '@ngrx/entity';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';

export interface ShopState {
  basket: fromBasket.BasketState;
  categories: fromCategories.CategoryState;
}

export interface State extends fromRoot.State {
  shop: ShopState;
}

export const reducers: ActionReducerMap<ShopState> = {
  basket: fromBasket.reducer,
  categories: fromCategories.reducer
};

export const getProductState = createFeatureSelector<ShopState>('shop');

export const getBasketState = createSelector(getProductState, (state: ShopState) => state.basket);
export const getCategoryState = createSelector(getProductState, (state: ShopState) => state.categories);

export const {
  selectIds: getCategoryIds,
  selectEntities: getCategoryEntities,
  selectAll: getAllCategories,
  selectTotal: categoryCount
} = fromCategories.adapter.getSelectors(getCategoryState);

export const {
  selectIds: selectBasketItemIds,
  selectEntities: selectBasketItemEntities,
  selectAll: selectAllBasketItems,
  selectTotal: basketItemCount
} = fromBasket.adapter.getSelectors (getBasketState);

export const getFirstCateogry = createSelector(
  getBasketState,
  (state) => state.ids[0]
);

export const getProductsForSelectedCategory = createSelector(
  fromCategories.getSelectedCategoryId,
  getCategoryEntities,
  (id, entities) => {
        return entities[id].products;
  }
);

// export const {
//   selectIds: getProductIds,
//   selectEntities: getProductEntities,
//   selectAll: getAllProducts,
//   selectTotal: productCount
// } = fromProducts.getSelectors(getProductState);

// export const getProductState = createSelector(getProductState, (state: ProductState) => state.products);

// export const getProductEntitiesState = createSelector(getProductsState,state => state.products);
// export const getSelectedProductId = createSelector(getProductEntitiesState,fromProducts.getSelectedId);

// export const getBasketProductIds = createSelector(
//   getBasketState,
//   (state) => { return state.ids}
// );

// //TODO:
// export const isSelectedProductInBasket = createSelector(
//   getSelectedProductId,
//   getBasketProductIds,
//   (selected, ids) => {
//     return ids.indexOf(selected) > -1;
//   }
// )
// export const getSelectedProduct = createSelector(
//   fromProducts.getProductEntities,
//   getSelectedProductId,
//   (entities, selectedId) => {
//     return selectedId && entities[selectedId];
//   }
// );

// export const getSearchState = createSelector(
//   getProductsState,
//   (state: ProductsState) => state.search
// );

// export const getSearchProductIds = createSelector(
//   getSearchState,
//   fromSearch.getIds
// );
// export const getSearchQuery = createSelector(
//   getSearchState,
//   fromSearch.getQuery
// );
// export const getSearchLoading = createSelector(
//   getSearchState,
//   fromSearch.getLoading
// );
// export const getSearchError = createSelector(
//   getSearchState,
//   fromSearch.getError
// );

// export const getSearchResults = createSelector(
//   fromProducts.getProductEntities,
//   getSearchProductIds,
//   (products, searchIds) => {
//     return searchIds.map(id => products[id]);
//   }
// );

// export const getProductState = createSelector(
//   getProductsState,
//   (state: ProductsState) => state.products
// );

// export const getProductLoaded = createSelector(
//   getProductState,
//   fromProducts.getLoaded
// );


// // export const getProductLoading = createSelector(
// //   getProductState,
// //   fromProducts.getLoading
// // );


// export const getBasketProducts = createSelector(
//   fromProducts.getProductEntities,
//   getBasketProductIds,
//   (entities, ids) => {
//     return ids.map(id => entities[id]);
//   }
// );


