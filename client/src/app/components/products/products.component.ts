
import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../model/product';

import { LucideAngularModule } from 'lucide-angular';
import { DrawerComponent } from '../drawer/drawer.component';
import { ProductFormComponent } from '../../forms/product-form/product-form.component';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';

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
  ],
  providers: [MessageService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {



  itemList: Product[] = [];



  productServices = inject(ProductService);

  ngOnInit(): void {
    this.productServices.getAllItems().subscribe((result: any) => {
      this.itemList = result.data;
    });
  }

  // Actions(Edit and Delete Buttons)
  editProduct = () =>{
    alert('edit')
  }
  deleteProduct = (id: number):void =>{
    if(confirm('Are you sure you want to delete this item?')){
      this.productServices.deleteProduct(id).subscribe({
        next:()=>{
          alert('Item deleted successfully!')
          window.location.reload()
        }, error:(err)=>{
          console.error('Deletion failed', err);
          alert('Error deleting item.');
        }
      })
    }
  }


  constructor(private messageService: MessageService) {}

  showToast() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }

 

  // Drawer
  isProductDrawerOpen  = false;
  openProductDrawer() {
    this.isProductDrawerOpen  = true;
  }
  closeProductDrawer() {
    this.isProductDrawerOpen  = false;
  }
}
