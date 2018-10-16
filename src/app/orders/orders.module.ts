import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../material';
import { OrderComponentsModule } from './components';
import { OrderListPageComponent } from './containers/order-list-page.component';
import { OrdersEffects } from './effects/orders.effects';
import { reducer } from './reducers/orders.reducer';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    OrderComponentsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: OrderListPageComponent},
      // { path: ':id', component: OrderViewDetailsComponent },
    ]),
    StoreModule.forFeature('orders', reducer),
    EffectsModule.forFeature([OrdersEffects]),
  ],
  declarations: [
    OrderListPageComponent  ],
  providers: [],
})
export class OrdersModule {}
