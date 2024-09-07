import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { CustomersComponent } from './components/customers/customers.component';
import { SalesComponent } from './components/sales/sales.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'master',
        pathMatch: 'full'
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
