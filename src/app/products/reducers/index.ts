import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromSearch from './search.reducer';
import * as fromProducts from './products.reducer';
import * as fromCategories from './categories.reducer';
import * as fromBasket from './basket.reducer';
import * as fromRoot from '../../reducers';
import { EntityState } from '@ngrx/entity';

export interface ProductsState {
  search: fromSearch.State;
  products: fromProducts.State;
  basket: fromBasket.BasketState;
  categories: fromCategories.CategoryState;
}

export interface State extends fromRoot.State {
  products: ProductsState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  search: fromSearch.reducer,
  products: fromProducts.reducer,
  basket: fromBasket.reducer,
  categories: fromCategories.reducer
};

export const getProductsState = createFeatureSelector<ProductsState>('products');

export const getBasketState = createSelector(getProductsState,(state: ProductsState) => state.basket);
export const getCategoryState = createSelector(getProductsState,(state: ProductsState) => state.categories);


export const getProductEntitiesState = createSelector(getProductsState,state => state.products);
export const getSelectedProductId = createSelector(getProductEntitiesState,fromProducts.getSelectedId);

export const getBasketProductIds = createSelector(
  getBasketState,
  (state) => { return state.ids}
);

//TODO: 
export const isSelectedProductInBasket = createSelector(
  getSelectedProductId,
  getBasketProductIds,
  (selected, ids) => {
    return ids.indexOf(selected) > -1;
  }
)
  

export const getSelectedProduct = createSelector(
  fromProducts.getProductEntities,
  getSelectedProductId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

export const getSearchState = createSelector(
  getProductsState,
  (state: ProductsState) => state.search
);

export const getSearchProductIds = createSelector(
  getSearchState,
  fromSearch.getIds
);
export const getSearchQuery = createSelector(
  getSearchState,
  fromSearch.getQuery
);
export const getSearchLoading = createSelector(
  getSearchState,
  fromSearch.getLoading
);
export const getSearchError = createSelector(
  getSearchState,
  fromSearch.getError
);

export const getSearchResults = createSelector(
  fromProducts.getProductEntities,
  getSearchProductIds,
  (products, searchIds) => {
    return searchIds.map(id => products[id]);
  }
);

export const getProductState = createSelector(
  getProductsState,
  (state: ProductsState) => state.products
);

export const getProductLoaded = createSelector(
  getProductState,
  fromProducts.getLoaded
);


// export const getProductLoading = createSelector(
//   getProductState,
//   fromProducts.getLoading
// );


export const getBasketProducts = createSelector(
  fromProducts.getProductEntities,
  getBasketProductIds,
  (entities, ids) => {
    return ids.map(id => entities[id]);
  }
);


