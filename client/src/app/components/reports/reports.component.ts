import { Component, inject, OnInit } from '@angular/core';
import { Customers } from '../../model/customers';
import { CustomersService } from '../../services/customers/customers.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, CalendarModule, FormsModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
  itemList: Customers[] = [];
  date2: Date | undefined;


  customerServices = inject(CustomersService);
  selectedCustomer: any;

  ngOnInit(): void {
    this.customerServices.getAllItems().subscribe((result: any) => {
      this.itemList = result.data;
    });
  }
}
