import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit{
  productForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

  productServices = inject(ProductService)

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      stock_quantity: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.productServices.createProduct(this.productForm.value).subscribe({
        next: (response)=>{
          console.log('Product created:', response);
          window.location.reload()
        },
        error: (err)=>{
          console.log('Error creating product: ', err)
        }
      })
    }}
}
