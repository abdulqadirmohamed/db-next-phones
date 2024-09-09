
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../model/product';

// import { ColDef } from '@ag-grid-community/core';
import { ColDef } from 'ag-grid-community'



@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit  {

  itemList: Product[] = [];

defaultColDef = {
  flex:1,
  minWidth: 100
}

  colDefs: ColDef[] = [
    { field: "name" },
    { field: "price" },
    { field: "stock_quantity" },
    { field: "category" }
  ];

  productServices = inject(ProductService);

  ngOnInit(): void {
    this.productServices.getAllItems().subscribe((result: any) => {
      this.itemList = result.data;
    });
  }

}
