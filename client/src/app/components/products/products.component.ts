
import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../model/product';

import { LucideAngularModule } from 'lucide-angular';
import { DrawerComponent } from '../drawer/drawer.component';
import { ProductFormComponent } from '../../forms/product-form/product-form.component';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    TableModule,
    LucideAngularModule,
    DrawerComponent,
    ProductFormComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {


  itemList: Product[] = [];


  ///////////////

  productServices = inject(ProductService);

  ngOnInit(): void {
    this.productServices.getAllItems().subscribe((result: any) => {
      this.itemList = result.data;
    });
  }


  isProductDrawerOpen  = false;

  openProductDrawer() {
    this.isProductDrawerOpen  = true;
  }

  closeProductDrawer() {
    this.isProductDrawerOpen  = false;
  }
}
