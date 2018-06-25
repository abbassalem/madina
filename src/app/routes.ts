import { Routes } from '@angular/router';
import { AuthGuard } from './auth/services/auth-guard.service';
import { NotFoundPageComponent } from './core/containers/not-found-page.component';
import { LoginPageComponent } from './auth/containers/login-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'shop',
    pathMatch: 'full'
  },
  {
    path: 'shop',
    loadChildren: './shop/shop.module#ShopModule'
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: '**',
    component: NotFoundPageComponent
  },
];


// export const routes: Routes = [
//   { path: '', redirectTo: 'product-list', pathMatch: 'full' },
//   { path: 'product-list', component: ProductList },
//   { path: 'product-details/:id', component: ProductDetails,
//     children: [
//       { path: '', redirectTo: 'overview', pathMatch: 'full' },
//       { path: 'overview', component: Overview },
//       { path: 'specs', component: Specs }
//     ]
//   }
// ];
