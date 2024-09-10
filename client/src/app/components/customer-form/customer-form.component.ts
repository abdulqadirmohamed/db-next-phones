
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { CustomersService } from '../../services/customers/customers.service';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})
export class CustomerFormComponent implements OnInit {

  customerForm!: FormGroup;

  customerServices = inject(CustomersService);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.customerForm.valid) {
      this.customerServices.createCustomer(this.customerForm.value).subscribe({
        next: (response)=>{
          console.log('Customer created:', response);
          window.location.reload()
        },
        error: (err)=>{
          console.error('Error creating customer:', err);
        }
      })
    }
  }
  
}
