import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  productForm: FormGroup;
  productId!: number;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initialize the form with form controls and validators
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      stock_quantity: ['', Validators.required],
      category: [''],
      description: ['']
    });
  }

  ngOnInit(): void {
    // Fetch customer ID from route parameters
    this.route.paramMap.subscribe((param) => {
      this.productId = Number(param.get('id'));
      if (this.productId) {
        // Fetch customer data if ID is available
        this.getProductById(this.productId);
      }
    });;
  }

    // Fetch customer by ID and populate the form
    getProductById(id: number) {
      this.productService.getProductById(id).subscribe({
        next: (response: any) => {
          const product = response.data[0]; // Access the first item in the 'data' array
          if (product) {
            this.productForm.patchValue({
              name: product.name,
              price: product.price,
              stock_quantity: product.stock_quantity,
              category: product.category,
              description: product.description
            });
            console.log(product);
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
  if (this.productForm.valid) {
    this.productService.updateProduct(this.productId,this.productForm.value).subscribe({
      next: (response) => {
        console.log('product updated:', response);
        this.router.navigateByUrl('/product')
      },
      error: (err) => {
        console.error('Error creating product:', err);
      }
    })
}}

}
