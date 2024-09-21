import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../model/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  formData: Product = {
    id: 0,
    name :'',
    description :'',
    price: 0,
    stock_quantity :0,
    category : '',
    created_at: ''
  };

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      const id = Number(param.get('id'));
      this.getById(id);
    });
  }
  getById(id: number) {
    this.productService.getProductById(id).subscribe((data) => {
      this.formData = data;
    });
  }
  onUpdate() {
    this.productService.updateProduct(this.formData).subscribe(() => {
      this.router.navigate(['/products']); // Redirect after update
    });
  }
}
