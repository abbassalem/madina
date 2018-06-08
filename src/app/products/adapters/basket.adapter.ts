import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BasketItem } from '../models/BasketItem.model';

export function sortByBasket(ob1: BasketItem, ob2: BasketItem): number {
   let result = 0;
   if(ob1.id > ob2.id) {
     result = 1
   }else if (ob1.id < ob2.id) {
     result = -1 
   }
   return result;
}

export const adapter: EntityAdapter<BasketItem> = createEntityAdapter<BasketItem>({
    selectId: (basket: BasketItem) => basket.id,
    sortComparer: sortByBasket,
  });

export const {
    selectIds: selectBasketItemIds,
    selectEntities: selectBasketItemEntities,
    selectAll: selectAllBasketItems,
    selectTotal: basketItemCount
  } = adapter.getSelectors(); 