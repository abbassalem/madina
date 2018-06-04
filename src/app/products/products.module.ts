import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ProductsComponentsModule } from './components';
import { ProductEffects } from './effects/product.effects';

import { ListProductPageComponent  } from './containers/list-product-page.component';
import { ViewProductPageComponent  } from './containers/view-product-page.component';
// import { BasketPageComponent } from './containers/basket-page.component';
import { MaterialModule } from '../material';

import { reducers } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ProductsComponentsModule,
    RouterModule.forChild([
      { path: 'list', component: ListProductPageComponent },
      {
        path: ':id',
        component: ViewProductPageComponent,
      },
      // { path: '', component: BasketPageComponent },
    ]),

    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature('products', reducers),

    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature([ProductEffects]),
  ],
  declarations: [
    ViewProductPageComponent,
    ListProductPageComponent
  ],
  providers: [],
})
export class ProductsModule {}
