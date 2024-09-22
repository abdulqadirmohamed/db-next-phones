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
    // Capture the product ID from the URL and convert it to a number
    this.productId = this.route.snapshot.params['id']; // The + converts the string to a number
    console.log('Product ID:', this.productId); // Debugging check

    // Fetch product data by ID and populate the form
    this.productService.getProductById(this.productId).subscribe((data) => {
      console.log('Product data:', data); 
      this.productForm.patchValue(data);
      console.log(this.productForm.patchValue(data))
    });
  }
  onSubmit() {
    if (this.productForm.valid) {
      this.productService.updateProduct(this.productId, this.productForm.value)
        .subscribe(() => {
          this.router.navigate(['/products']); // Redirect to product list after successful update
        });
    }
  }

}
