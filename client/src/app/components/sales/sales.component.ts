import { Component, inject, OnInit } from '@angular/core';
import { Sales } from '../../model/sales';
import { SalesService } from '../../services/sales/sales.service';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent implements OnInit {

  itemList: Sales[] = [];


  salesServices = inject(SalesService)

  ngOnInit(): void {
    this.salesServices.getAllISales().subscribe((result: any) => {
      this.itemList = result.data;
      console.log(this.itemList)
    });
  }

}
