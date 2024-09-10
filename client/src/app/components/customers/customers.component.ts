import { Component, inject, OnInit } from '@angular/core';

import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
// import { ColDef } from '@ag-grid-community/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community'
import { Customers } from '../../model/customers';
import { CustomersService } from '../../services/customers/customers.service';
import { DrawerComponent } from "../drawer/drawer.component";
import { LucideAngularModule } from 'lucide-angular';
import { CustomerFormComponent } from "../customer-form/customer-form.component";

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [AgGridAngular, DrawerComponent, LucideAngularModule, CustomerFormComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {

  private gridApi!: GridApi<any>;
  pagination=true;
  paginationPageSize = 10
  itemList: Customers[] = [];

  defaultColDef = {
    flex: 1,
    minWidth: 100
  }
  public rowSelection: "single" | "multiple" = "multiple";
  
  colDefs: ColDef[] = [
    { field: "name", filter: 'agTextColumnFilter', checkboxSelection: true},
    { field: "phone", filter:"agTextColumnFilter" },
    { field: "address", filter:'agTextColumnFilter' },
    { field: "created_at", filter:'agTextColumnFilter' }
  ];

  customerServices = inject(CustomersService);

  ngOnInit(): void {
    this.customerServices.getAllItems().subscribe((result: any) => {
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


  isCustomerDrawerOpen = false;

  openCustomerDrawer() {
    this.isCustomerDrawerOpen = true;
  }

  closeCustomerDrawer() {
    this.isCustomerDrawerOpen = false;
  }
}
