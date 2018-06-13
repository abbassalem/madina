import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material';
import { PipesModule } from '../../shared/pipes';
import { ProductDetailComponent } from './product-detail.component';
import { ProductListComponent } from './product-list.component';
import { ProductViewComponent } from './product-view.component';
import { ProductSearchComponent } from './product-search.component';



export const PRODUCTS_COMPONENTS = [
  ProductListComponent,
  ProductViewComponent,
  ProductDetailComponent,
  ProductSearchComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    PipesModule,
  ],
  declarations: PRODUCTS_COMPONENTS,
  exports: PRODUCTS_COMPONENTS,
})
export class ProductsComponentsModule {}
