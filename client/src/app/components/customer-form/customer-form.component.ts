
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomersService } from '../../services/customers/customers.service';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, private router: Router) { }

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
          // this.router.navigateByUrl('/customer')
          window.location.reload()
        },
        error: (err)=>{
          console.log('Error creating customer: ', err)
        }
      })
    }}
}
