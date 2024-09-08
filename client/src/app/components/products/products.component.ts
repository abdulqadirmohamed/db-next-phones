import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular'; // Angular Data Grid Component
import { Component, OnInit } from '@angular/core';

import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  userList:any[] = []

  rowData = [
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
  ];

  // Column Definitions: Defines the columns to be displayed.
colDefs: ColDef[] = [
 { field: "name" },
 { field: "username" },
 { field: "email" },
];


  constructor(private http: HttpClient){ }

  

  ngOnInit(): void {
    this.getUser
  }
  getUser(){
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((res:any)=>{
      this.userList = res
    })
  }
}
