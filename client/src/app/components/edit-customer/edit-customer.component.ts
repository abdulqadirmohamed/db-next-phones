import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomersService } from '../../services/customers/customers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Customers } from '../../model/customers';

@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.css'
})
export class EditCustomerComponent {

  // @Input() customer: any; // Receive customer data for editing
  customerForm!: FormGroup;
  customerId!: number; // Track customer ID for updating


  customerServices = inject(CustomersService);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

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
      phone: ['', Validators.required]
    });
  }
  // Fetch customer by ID and populate the form
  getCustomerById(id: number) {
    this.customerServices.getCustomerById(id).subscribe({
      next: (customer: Customers) => {
        if (customer) {
          // Use patchValue to populate the form
          this.customerForm.patchValue({
            name: customer.name,
            address: customer.address,
            phone: customer.phone
          });
          console.log(customer)
        } else {
          console.error('Customer not found');
        }
      }, error: (err) => {
        console.error('Error fetching customer data:', err);
      }
    });
  }

  // Handle form submission
  onSubmit() {
    if (this.customerForm.valid) {
      const updatedCustomer: Customers = this.customerForm.value;
      this.customerServices.updateCustomer(this.customerId, updatedCustomer).subscribe(() => {
        console.log('Customer updated successfully!');
        this.router.navigate(['/customers']); // Navigate back to customer list after update
      }, (error) => {
        console.error('Error updating customer:', error);
      });
    }
  }
}
