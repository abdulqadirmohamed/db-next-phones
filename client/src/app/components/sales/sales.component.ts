import { Component, inject, OnInit } from '@angular/core';
import { Sales } from '../../model/sales';
import { SalesService } from '../../services/sales/sales.service';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { LucideAngularModule } from 'lucide-angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [  
    TableModule,
    Button,
    IconFieldModule,
    InputIconModule,
    LucideAngularModule, 
    DatePipe
  ],
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

  deleteSales = (id: number): void => {
    if (confirm('Are you sure you want to delete this item?')) {
     
    }
  }

}
