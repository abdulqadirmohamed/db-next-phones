import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Product } from '../../model/product';
import { ProductService } from '../../services/product/product.service';
import { Customers } from '../../model/customers';
import { CustomersService } from '../../services/customers/customers.service';
import { CalendarModule } from 'primeng/calendar';


@Component({
  selector: 'app-sales-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, DropdownModule, CalendarModule],
  templateUrl: './sales-form.component.html',
  styleUrl: './sales-form.component.css'
})
export class SalesFormComponent implements OnInit  {
  salesForm: FormGroup;

  productList: Product[] = []
  selectedProduct: string | undefined;

  customerList: Customers[] = []
  selectedCustomer: string | undefined;

  date2: Date | undefined;

  productService = inject(ProductService)
  customerService = inject(CustomersService)
i: any;

  constructor(private fb: FormBuilder) {
    this.salesForm = this.fb.group({
      sales: this.fb.array([this.createSaleItem()]),  // Initialize with one item
    });
  }

   // Get the form array
   get sales(): FormArray {
    return this.salesForm.get('sales') as FormArray;
  }

   // Create a single sale item group
   createSaleItem(): FormGroup {
    return this.fb.group({
      product: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [{ value: 50000, disabled: true }],
      discount: [0],
      discountType: ['$', Validators.required],  // Could be '%' or '$'
      amount: [{ value: 0, disabled: true }],
      taxPercentage: [{ value: 5, disabled: true }],
      tax: [{ value: 0, disabled: true }],
    });
  }

   // Add a new row to the form array
   addSaleItem(): void {
    this.sales.push(this.createSaleItem());
  }

  // Remove a row from the form array
  removeSaleItem(index: number): void {
    if (this.sales.length > 1) {
      this.sales.removeAt(index);
    }
  }

  // Optional: You can create a method to calculate the total
  calculateTotal(index: number): void {
    const saleItem = this.sales.at(index);
    const quantity = saleItem.get('quantity')?.value;
    const price = 50000; // Example price
    const discount = saleItem.get('discount')?.value;
    const discountType = saleItem.get('discountType')?.value;

    let amount = quantity * price;
    
    // Calculate discount based on type
    if (discountType === '$') {
      amount -= discount;
    } else if (discountType === '%') {
      amount -= (amount * discount) / 100;
    }

    const taxPercentage = 5; // Example tax percentage
    const tax = (amount * taxPercentage) / 100;

    // Set the calculated amount and tax
    saleItem.get('amount')?.setValue(amount);
    saleItem.get('tax')?.setValue(tax);
  }

    ngOnInit() {
      this.productService.getAllItems().subscribe((result:any)=>{
        this.productList = result.data;
      })

      this.customerService.getAllItems().subscribe((result:any)=>{
        this.customerList = result.data
      })


    }
}
