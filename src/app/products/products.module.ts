import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ProductsComponentsModule } from './components';
import { ProductEffects } from './effects/product.effects';

import { ProductPreviewListPageComponent  } from './containers/product-preview-list-page.component';
import { ViewProductPageComponent  } from './containers/view-product-page.component';
import { MaterialModule } from '../material';

import { reducers } from './reducers';
import { SelectedProductPageComponent } from './containers/selected-product-page.component';
import { BasketPageComponent } from './containers/basket-page.component';
import { ProductService } from '../core/services/product.service';
import { NotFoundPageComponent } from '../core/containers/not-found-page.component';
import { BasketEffects } from './effects/basket.effects';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryEffects } from './effects/category.effects';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ProductsComponentsModule,
    ReactiveFormsModule, 
    RouterModule.forChild([
      { path: 'list', component: ProductPreviewListPageComponent },
      { path: 'basket', component: BasketPageComponent },
      { path: ':id', component: ViewProductPageComponent},
      { path: '', component: ProductPreviewListPageComponent}
    ]),

    
    StoreModule.forFeature('products', reducers),

    EffectsModule.forFeature([ProductEffects, BasketEffects, CategoryEffects]),
  ],
  declarations: [
    SelectedProductPageComponent,
    ViewProductPageComponent,
    ProductPreviewListPageComponent,
    BasketPageComponent
  ],
  providers: [],
})
export class ProductsModule {}
