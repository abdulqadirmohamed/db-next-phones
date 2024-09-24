import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Product } from '../../model/product';
import { ProductService } from '../../services/product/product.service';
import { Customers } from '../../model/customers';
import { CustomersService } from '../../services/customers/customers.service';
import { CalendarModule } from 'primeng/calendar';


@Component({
  selector: 'app-sales-form',
  standalone: true,
  imports: [FormsModule, DropdownModule, CalendarModule],
  templateUrl: './sales-form.component.html',
  styleUrl: './sales-form.component.css'
})
export class SalesFormComponent implements OnInit  {

  productList: Product[] = []
  selectedProduct: string | undefined;

  customerList: Customers[] = []
  selectedCustomer: string | undefined;

  date2: Date | undefined;

  productService = inject(ProductService)
  customerService = inject(CustomersService)

    ngOnInit() {
      this.productService.getAllItems().subscribe((result:any)=>{
        this.productList = result.data;
      })

      this.customerService.getAllItems().subscribe((result:any)=>{
        this.customerList = result.data
      })


    }
}
