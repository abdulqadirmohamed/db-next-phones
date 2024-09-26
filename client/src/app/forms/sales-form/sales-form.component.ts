import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { Product } from '../../model/product';
import { ProductService } from '../../services/product/product.service';
import { Customers } from '../../model/customers';
import { CustomersService } from '../../services/customers/customers.service';
import { CalendarModule } from 'primeng/calendar';
import { CommonModule } from '@angular/common';
import { SalesService } from '../../services/sales/sales.service';
import { Sales } from '../../model/sales';



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
  salesService = inject(SalesService)

  constructor(private fb: FormBuilder) {
    this.invoiceForm = this.fb.group({
      customer_id: ['', Validators.required],
      sale_date: ['', Validators.required],
      items: this.fb.array([this.createItem()]),
    });
  }
  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }
  createItem(): FormGroup {
    return this.fb.group({
      product_id: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      total_amount: [0, [Validators.required, Validators.min(0)]],
      // discount: [0, [Validators.min(0)]],
      // amount: [0, [Validators.required, Validators.min(0)]],
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
      (sum, item) => sum + item.value.quantity * item.value.total_amount,

      // (sum, item) => {
      //   const itemTotal = item.value.quantity * (item.value.price - item.value.discount)
      //   return sum + itemTotal
      // },
      0
    );
  }

  onSubmit() {
    if (this.invoiceForm.valid) {
      const salesData = {
        customer_id: this.invoiceForm.value.customer_id,
        sale_date: new Date().toISOString(), // You can also allow the user to select this
        items: this.items.value // Getting the items from the form
      };

      this.salesService.createSales(salesData).subscribe({
        next: (response) => {
          console.log('Sale created:', response);
          alert('Sale successfully recorded');
        }, error: (err) => {
          console.error('Error creating sale:', err);
          alert('Failed to record sale');
        }
      });
    }
  }

  // (response: any) => {
  //   console.log('Sale created:', response);
  //   alert('Sale successfully recorded');
  // },
  // (error) => {
  //   console.error('Error creating sale:', error);
  //   alert('Failed to record sale');
  // }

  // onSubmit() {
  //   if (this.invoiceForm.valid) {
  //     const totalAmount = this.getTotal();
  //     this.invoiceForm.patchValue({total_amount: totalAmount})

  //     this.salesService.createSales(this.invoiceForm.value).subscribe((response: any)=>{
  //       console.log('Sale created:', response);
  //         alert('Sale successfully recorded');
  //     }, (error) => {
  //       console.error('Error creating sale:', error);
  //       alert('Failed to record sale');
  //     })
  //   }
  // }


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
