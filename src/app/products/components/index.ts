import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ProductPreviewListComponent } from './product-preview-list.component';

import { PipesModule } from '../../shared/pipes';
import { MaterialModule } from '../../material';
import { ProductPreviewComponent } from './product-preview.component';
import { ProductDetailComponent } from './product-detail.component';

export const PRODUCTS_COMPONENTS = [
  ProductPreviewListComponent,
  ProductPreviewComponent,
  ProductDetailComponent
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
