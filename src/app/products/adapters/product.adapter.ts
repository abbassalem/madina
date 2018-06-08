import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Product } from '../models/product.model';

export function sortByProduct(ob1: Product, ob2: Product): number {
   return ob1.name.localeCompare(ob2.name);
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
    selectId: (product: Product) => product.id,
    sortComparer: sortByProduct,
  });

export const {
    selectIds: selectProductIds,
    selectEntities: selectProductEntities,
    selectAll: selectAllProducts,
    selectTotal: productCount
  } = adapter.getSelectors(); 