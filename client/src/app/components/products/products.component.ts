
import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../model/product';

import { LucideAngularModule } from 'lucide-angular';
import { DrawerComponent } from '../drawer/drawer.component';
import { ProductFormComponent } from '../../forms/product-form/product-form.component';
import { Table, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    TableModule,
    Button,
    ToastModule,
    LucideAngularModule,
    DrawerComponent,
    ProductFormComponent,
    CommonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule
  ],
  providers: [MessageService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {

  itemList: Product[] = [];
  searchValue: string | undefined;



  productServices = inject(ProductService);
  dt2: any;

  ngOnInit(): void {
    this.productServices.getAllItems().subscribe((result: any) => {
      this.itemList = result.data;
    });
  }

  // Actions(Edit and Delete Buttons)
  editProduct = () => {
    alert('edit')
  }
  deleteProduct = (id: number): void => {
    if (confirm('Are you sure you want to delete this item?')) {
      this.productServices.deleteProduct(id).subscribe({
        next: () => {
          alert('Item deleted successfully!')
          window.location.reload()
        }, error: (err) => {
          console.error('Deletion failed', err);
          alert('Error deleting item.');
        }
      })
    }
  }


  constructor(private messageService: MessageService) { }

  showToast() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }

  // qauntity


// clear
clear(table: Table) {
  table.clear();
  this.searchValue = ''
}

  // Drawer
  isProductDrawerOpen = false;
  openProductDrawer() {
    this.isProductDrawerOpen = true;
  }
  closeProductDrawer() {
    this.isProductDrawerOpen = false;
  }
}
