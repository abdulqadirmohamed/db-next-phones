import { Component, inject, OnInit } from '@angular/core';

import { Customers } from '../../model/customers';
import { CustomersService } from '../../services/customers/customers.service';
import { DrawerComponent } from "../drawer/drawer.component";
import { LucideAngularModule } from 'lucide-angular';
import { CustomerFormComponent } from "../customer-form/customer-form.component";

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [DrawerComponent, LucideAngularModule, CustomerFormComponent],
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

 
  isCustomerDrawerOpen = false;

  openCustomerDrawer() {
    this.isCustomerDrawerOpen = true;
  }

  closeCustomerDrawer() {
    this.isCustomerDrawerOpen = false;
  }
}
