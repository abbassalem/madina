import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../material';
import { ProductsComponentsModule } from './components';
import { BasketPageComponent } from './containers/basket-page.component';
import { ListProductPageComponent } from './containers/list-product-page.component';
import { SelectedProductPageComponent } from './containers/selected-product-page.component';
import { ViewProductPageComponent } from './containers/view-product-page.component';
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
      { path: 'categories/:id', component: ListProductPageComponent},
      { path: 'products/:productId', component: ViewProductPageComponent},
      { path: 'basket', component: BasketPageComponent },
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
