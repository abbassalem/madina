import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Category } from '../models/category.model';

export function sortByCategory(ob1: Category, ob2: Category): number {
   return ob1.name.localeCompare(ob2.name);
}

export const adapter: EntityAdapter<Category> = createEntityAdapter<Category>({
    selectId: (category: Category) => category.id,
    sortComparer: sortByCategory,
  });

export const {
    selectIds: selectCategoryIds,
    selectEntities: selectCategoryEntities,
    selectAll: selectAllCategories,
    selectTotal: categoryCount
  } = adapter.getSelectors(); 