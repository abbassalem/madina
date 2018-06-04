import { Routes } from '@angular/router';
import { AuthGuard } from './auth/services/auth-guard.service';
import { NotFoundPageComponent } from './core/containers/not-found-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  {
    path: 'products',
    loadChildren: './products/products.module#ProductsModule'
  },
  {
    path: 'books',
    loadChildren: './books/books.module#BooksModule',
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundPageComponent },
];
