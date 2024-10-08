import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { CustomersComponent } from './components/customers/customers.component';
import { SalesComponent } from './components/sales/sales.component';
import { authGuard } from './guard/auth.guard';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ReportsComponent } from './components/reports/reports.component';
import { SalesFormComponent } from './forms/sales-form/sales-form.component';
import { LoginComponent } from './auth/login/login.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { PasswordResetComponent } from './auth/password-reset/password-reset.component';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthLayoutComponent,
        children: [
          { path: 'login', component: LoginComponent },
          { path: 'password_reset', component: PasswordResetComponent }
        ]
      },
      {
        path: '',
        component: DefaultLayoutComponent, canActivate:[authGuard],
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'product', component: ProductsComponent },
          { path: 'customer', component: CustomersComponent },
          { path: 'customer/edit/:id', component: EditCustomerComponent },
          { path: 'sales', component: SalesComponent },
          { path: 'sales/invoice', component: SalesFormComponent },
          { path: 'reports', component: ReportsComponent },
          { path: 'product/edit/:id', component: EditProductComponent },
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
      },
      { path: '**', redirectTo: 'login' },
];
