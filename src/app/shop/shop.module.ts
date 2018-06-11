import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ProductsComponentsModule } from './components';
import { ProductEffects } from './effects/product.effects';

import { ListProductPageComponent  } from './containers/list-product-page.component';
import { ViewProductPageComponent  } from './containers/view-product-page.component';
import { MaterialModule } from '../material';

import { reducers } from './reducers';
import { SelectedProductPageComponent } from './containers/selected-product-page.component';
import { BasketPageComponent } from './containers/basket-page.component';
import { ProductService } from '../core/services/product.service';
import { NotFoundPageComponent } from '../core/containers/not-found-page.component';
import { BasketEffects } from './effects/basket.effects';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductPreviewComponent } from './components/product-preview.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ProductsComponentsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
       { path: '', redirectTo: 'categories/0', pathMatch: 'full'},
      { path: 'categories/:id', component: ListProductPageComponent,
        children: [ 
          { path: 'products/:productId', component: SelectedProductPageComponent}
        ]},
      { path: 'basket', component: BasketPageComponent },
      { path: ':id', component: ViewProductPageComponent},
      { path: '**', redirectTo: 'categories/0', pathMatch: 'full' }

    ]),

    StoreModule.forFeature('shop', reducers),

    EffectsModule.forFeature([ProductEffects, BasketEffects]),
  ],
  declarations: [
    SelectedProductPageComponent,
    ViewProductPageComponent,
    ListProductPageComponent,
    BasketPageComponent
  ],
  providers: [],
})
export class ShopModule {}


     // { path: 'categories', component: ListProductPageComponent
      // children: [
      //     { path: '', redirectTo: '/0', pathMatch: 'full'},
      //     { path: ':id', component: ListProductPageComponent},
      //   ]
      // },