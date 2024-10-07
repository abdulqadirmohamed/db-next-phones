import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomersService } from '../../services/customers/customers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Customers } from '../../model/customers';

@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.css',
})
export class EditCustomerComponent {
  // @Input() customer: any; // Receive customer data for editing
  customerForm!: FormGroup;
  customerId!: number; // Track customer ID for updating

  customerServices = inject(CustomersService);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Fetch customer ID from route parameters
    this.route.paramMap.subscribe((param) => {
      this.customerId = Number(param.get('id'));
      if (this.customerId) {
        // Fetch customer data if ID is available
        this.getCustomerById(this.customerId);
      }
    });

    // Initialize the form
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }
  // Fetch customer by ID and populate the form
  getCustomerById(id: number) {
    this.customerServices.getCustomerById(id).subscribe({
      next: (response: any) => {
        const customer = response.data[0]; // Access the first item in the 'data' array
        if (customer) {
          this.customerForm.patchValue({
            name: customer.name,
            address: customer.address,
            phone: customer.phone,
          });
          console.log(customer);
        } else {
          console.error('Customer not found');
        }
      },
      error: (err) => {
        console.error('Error fetching customer data:', err);
      },complete: () => {
        console.log('Customer fetch operation completed');
      }
    });
  }

  // Handle form submission
  onSubmit() {
    if (this.customerForm.valid) {
      this.customerServices.updateCustomer(this.customerId,this.customerForm.value).subscribe({
        next: (response) => {
          console.log('Customer created:', response);
          window.location.reload()
        },
        error: (err) => {
          console.error('Error creating customer:', err);
        }
      })
  }}
}
