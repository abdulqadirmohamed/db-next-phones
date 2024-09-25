import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Product } from '../../model/product';
import { ProductService } from '../../services/product/product.service';
import { Customers } from '../../model/customers';
import { CustomersService } from '../../services/customers/customers.service';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sales-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, DropdownModule, CalendarModule],
  templateUrl: './sales-form.component.html',
  styleUrl: './sales-form.component.css'
})
export class SalesFormComponent implements OnInit {
  invoiceForm!: FormGroup;
  
  productList: Product[] = []
  selectedProduct: string | undefined;
  customerList: Customers[] = []
  selectedCustomer: string | undefined;



  productService = inject(ProductService)
  customerService = inject(CustomersService)

  constructor(private fb: FormBuilder) {
    this.invoiceForm = this.fb.group({
      customerName: ['', Validators.required],
      invoiceDate: ['', Validators.required],
      items: this.fb.array([this.createItem()]),
    });
  }
  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }
  createItem(): FormGroup {
    return this.fb.group({
      itemName: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
    });
  }
  addItem() {
    this.items.push(this.createItem());
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }
  getTotal(): number {
    return this.items.controls.reduce(
      (sum, item) => sum + item.value.quantity * item.value.price,
      0
    );
  }
  onSubmit() {
    if (this.invoiceForm.valid) {
      console.log(this.invoiceForm.value);
    }
  }


  // 

  ngOnInit() {
    this.productService.getAllItems().subscribe((result: any) => {
      this.productList = result.data;
    })

    this.customerService.getAllItems().subscribe((result: any) => {
      this.customerList = result.data
    })
  }

}
