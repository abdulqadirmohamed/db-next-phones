import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';

import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { CustomersComponent } from './components/customers/customers.component';
import { SalesComponent } from './components/sales/sales.component';
import { authGuard } from './guard/auth.guard';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ReportsComponent } from './components/reports/reports.component';

export const routes: Routes = [
    {
        path: 'login',
        component: AuthLayoutComponent,
        children: [
          { path: '', component: LoginComponent }
        ]
      },
      {
        path: '',
        component: DefaultLayoutComponent, canActivate:[authGuard],
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'product', component: ProductsComponent },
          { path: 'customer', component: CustomersComponent },
          { path: 'sales', component: SalesComponent },
          { path: 'reports', component: ReportsComponent },
          { path: 'product/edit/:id', component: EditProductComponent },
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
      },
      { path: '**', redirectTo: 'login' },
];
