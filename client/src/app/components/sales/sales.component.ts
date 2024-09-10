import { Component, inject, OnInit } from '@angular/core';
import { ColDef, GridApi } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { Sales } from '../../model/sales';
import { SalesService } from '../../services/sales/sales.service';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent implements OnInit {

  private gridApi!: GridApi<any>;

  pagination = true;
  paginationPageSize = 10;
  
  itemList: Sales[] = [];

  defaultColDef = {
    flex: 1,
    minWidth: 100,
  };
  public rowSelection: 'single' | 'multiple' = 'multiple';

  colDefs: ColDef[] = [
    { field: 'customer_name', filter: 'agTextColumnFilter', checkboxSelection: true },
    { field: 'product_name', filter: 'agTextColumnFilter' },
    { field: 'quantity', filter: 'agTextColumnFilter' },
    {
      field: 'total_amount',
      cellRenderer: (item: any) => {
        return '$ ' + item.value;
      },
      filter: 'agTextColumnFilter',
    }
  ];


  salesServices = inject(SalesService)

  ngOnInit(): void {
    this.salesServices.getAllISales().subscribe((result: any) => {
      this.itemList = result.data;
      console.log(this.itemList)
    });
  }

}
