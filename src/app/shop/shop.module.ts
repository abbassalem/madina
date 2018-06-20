import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../material';
import { ProductsComponentsModule } from './components';
import { BasketPageComponent } from './containers/basket-page.component';
import { ProductListPageComponent } from './containers/product-list-page.component';
import { ProductSelectedPageComponent } from './containers/product-selected-page.component';
import { ProductViewPageComponent } from './containers/product-view-page.component';
import { BasketEffects } from './effects/basket.effects';
import { ProductEffects } from './effects/product.effects';
import { reducers } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ProductsComponentsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'categories/0', pathMatch: 'full'},
      { path: 'categories/:id', component: ProductListPageComponent},
      { path: 'products/:productId', component: ProductViewPageComponent},
      { path: 'basket', component: BasketPageComponent}
    ]),

    StoreModule.forFeature('shop', reducers),

    EffectsModule.forFeature([ProductEffects, BasketEffects]),
  ],
  declarations: [
    ProductSelectedPageComponent,
    ProductViewPageComponent,
    ProductListPageComponent,
    BasketPageComponent
  ],
  providers: [],
})
export class ShopModule {}
