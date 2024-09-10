
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../model/product';

// import { ColDef } from '@ag-grid-community/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community'



@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  private gridApi!: GridApi<any>;
  pagination=true;
  paginationPageSize = 10
  itemList: Product[] = [];

  defaultColDef = {
    flex: 1,
    minWidth: 100
  }
  public rowSelection: "single" | "multiple" = "multiple";
  
  colDefs: ColDef[] = [
    { field: "name", filter: 'agTextColumnFilter', checkboxSelection: true},
    { field: "price", cellRenderer: (item: any) => { return "$ " + item.value }, filter:"agTextColumnFilter" },
    { field: "stock_quantity", headerName: "Stock Quantity", filter:'agTextColumnFilter' },
    { field: "category", filter:'agTextColumnFilter' },
    {
      headerName: 'Options',
      field: 'options',
      cellRenderer: 'buttonRenderer', // Custom renderer for buttons
      cellRendererParams: {
        onEdit: (params: any) => this.onEditButtonClick(params)
      }
    }
  ];

  productServices = inject(ProductService);

  ngOnInit(): void {
    this.productServices.getAllItems().subscribe((result: any) => {
      this.itemList = result.data;
    });
  }

  onBtExport() {
    this.gridApi.exportDataAsCsv();
  }

  onGridReady(event: GridReadyEvent<any>){
    this.gridApi = event.api;
  }

   // Edit button handler
   onEditButtonClick(params: any) {
    console.log('Editing row: ', params.data);
    // Here you can navigate to an edit page or open a modal
  }
}
