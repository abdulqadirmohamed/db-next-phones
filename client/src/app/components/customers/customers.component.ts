import { Component, inject, OnInit } from '@angular/core';

import { Customers } from '../../model/customers';
import { CustomersService } from '../../services/customers/customers.service';
import { DrawerComponent } from "../drawer/drawer.component";
import { LucideAngularModule } from 'lucide-angular';
import { CustomerFormComponent } from "../customer-form/customer-form.component";

import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    DrawerComponent, 
    LucideAngularModule, 
    CustomerFormComponent,
    TableModule,
    Button,
    IconFieldModule,
    InputIconModule,
    DatePipe
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {


  itemList: Customers[] = [];


  customerServices = inject(CustomersService);

  ngOnInit(): void {
    this.customerServices.getAllItems().subscribe((result: any) => {
      this.itemList = result.data;
    });
  }

  deleteCustomer = (id: number): void => {
    if (confirm('Are you sure you want to delete this Customer?')) {
      this.customerServices.deletCustomer(id).subscribe({
        next: () => {
          alert('Customer deleted successfully!')
          window.location.reload()
        }, error: (err) => {
          console.error('Deletion failed', err);
          alert('Error deleting item.');
        }
      })
    }
  }


  // Insert customer  drawerr
  isCustomerDrawerOpen = false;

  openCustomerDrawer() {
    this.isCustomerDrawerOpen = true;
  }

  closeCustomerDrawer() {
    this.isCustomerDrawerOpen = false;
  }
}
