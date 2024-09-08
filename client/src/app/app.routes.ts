import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { CustomersComponent } from './components/customers/customers.component';
import { SalesComponent } from './components/sales/sales.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: '',
        component: DashboardComponent
    }, 
    {
        path: 'products',
        component: ProductsComponent
    }, 
    {
        path: 'customers',
        component: CustomersComponent
    },
    {
        path: 'sales',
        component: SalesComponent
    }
];
