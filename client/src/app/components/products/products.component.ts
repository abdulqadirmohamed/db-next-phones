import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../model/product';

// import { ColDef } from '@ag-grid-community/core';
import { ColDef, GridApi, GridReadyEvent, RowClickedEvent } from 'ag-grid-community';
import { LucideAngularModule } from 'lucide-angular';
import { DrawerComponent } from '../drawer/drawer.component';
import { ProductFormComponent } from '../../forms/product-form/product-form.component';
import { CustomButtonComponentComponent } from '../custom-button-component/custom-button-component.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    AgGridAngular,
    LucideAngularModule,
    DrawerComponent,
    ProductFormComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {

  onRowClicked(event: RowClickedEvent) {
    alert('Hello')
  }


  private gridApi!: GridApi<any>;
  pagination = true;
  paginationPageSize = 10;
  itemList: Product[] = [];

  defaultColDef = {
    flex: 1,
    minWidth: 100,
  };
  public rowSelection: 'single' | 'multiple' = 'multiple';

  colDefs: ColDef[] = [
    { field: 'name', filter: 'agTextColumnFilter', checkboxSelection: false },
    {
      field: 'price',
      cellRenderer: (item: any) => {
        return '$ ' + item.value;
      },
      filter: 'agTextColumnFilter',
    },
    {
      field: 'stock_quantity',
      headerName: 'Stock Quantity',
      filter: 'agTextColumnFilter',
    },
    { field: 'actions', headerName: 'Actions', cellRenderer: this.actionCellRenderer.bind(this) },
    // { field: 'category', filter: 'agTextColumnFilter' },
    // { field: 'actions', cellRenderer: this.createButtonRenderer() },
  ];

  // createButtonRenderer() {
  //   return (params: any) => {
  //     return `<button>Edit</button> <button>Delete</button>`;
  //   };
  // }

  actionCellRenderer(params: any) {
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => this.editRow(params.data));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => this.deleteRow(params.data));

    const container = document.createElement('div');
    container.appendChild(editButton);
    container.appendChild(deleteButton);

    return container;
  }

  editRow(rowData: any) {
    // Implement edit functionality
  }

  deleteRow(rowData: any) {
    // Implement delete functionality
  }



  ///////////////

  productServices = inject(ProductService);

  ngOnInit(): void {
    this.productServices.getAllItems().subscribe((result: any) => {
      this.itemList = result.data;
    });
  }

  onBtExport() {
    this.gridApi.exportDataAsCsv();
  }

  onGridReady(event: GridReadyEvent<any>) {
    this.gridApi = event.api;
  }

  // Edit button handler
  onEditButtonClick(params: any) {
    console.log('Editing row: ', params.data);
    // Here you can navigate to an edit page or open a modal
  }

  
  isProductDrawerOpen  = false;

  openProductDrawer() {
    this.isProductDrawerOpen  = true;
  }

  closeProductDrawer() {
    this.isProductDrawerOpen  = false;
  }
}
