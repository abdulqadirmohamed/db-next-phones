
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomersService } from '../../services/customers/customers.service';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})
export class CustomerFormComponent implements OnInit {
  @Input() customer: any; // Receive customer data for editing
  customerForm!: FormGroup;


  customerServices = inject(CustomersService);

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.customerForm.valid) {
      if (this.customer) {
        // Update existing customer
        this.customerServices.updateCustomer(this.customer.id, this.customerForm.value).subscribe({
          next: (response) => {
            console.log('Customer updated:', response);
            window.location.reload();
          },
          error: (err) => {
            console.error('Error updating customer:', err);
          }
        });
      } else {
        this.customerServices.createCustomer(this.customerForm.value).subscribe({
          next: (response) => {
            console.log('Customer created:', response);
            window.location.reload()
          },
          error: (err) => {
            console.error('Error creating customer:', err);
          }
        })
      }
    }

  }
}
