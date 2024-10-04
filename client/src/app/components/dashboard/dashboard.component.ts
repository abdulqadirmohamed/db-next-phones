import { Component, inject, OnInit } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { IncomeExpenseChartComponent } from "../../charts/income-expense-chart/income-expense-chart.component";
import { CustomersService } from '../../services/customers/customers.service';
import { SalesService } from '../../services/sales/sales.service';
import { AuthService } from '../../services/auth/auth.service';
import { ProductService } from '../../services/product/product.service';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, IncomeExpenseChartComponent, CalendarModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  usersList:any[] = []
  latestSales:any[] = [];
  allSales:any[] = [];
  productList:any[] = [];

  date: Date[] | undefined;

  totalTodaySales: number = 0;
  totalSales: number = 0;
  totalProducts: number = 0
  totalCustomers: number = 0;

  customerServices = inject(CustomersService)
  salesServices = inject(SalesService)
  productServices = inject(ProductService)

  authService = inject(AuthService)

  items = [
    {
      icon: 'circle-dollar-sign',
      label: 'Total Today Sales',
      total: this,
      isMoney: true
    },
    {
      icon: 'trending-up',
      label: 'Total Sales',
      total: this.totalSales,
      isMoney: true
    },
    {
      icon: 'package-2',
      label: 'Total Products',
      total: this.totalProducts,
      isMoney: false
    },
    {
      icon: 'users',
      label:'Total Customers',
      total: this.totalProducts,
      isMoney: false
    },

  ];

  ngOnInit(): void {

    // this.authService.getAllUsers().subscribe((res:any)=> {
    //   this.usersList = res.result
    // })

    this.productServices.getTotalProducts().subscribe(data => {
      this.totalProducts = data.totalProducts;
      this.items[3].total = this.totalProducts
    });

    this.customerServices.getTotalCustomers().subscribe(data => {
      this.totalCustomers = data.totalCustomers;
      this.items[2].total = this.totalCustomers
    });

    this.salesServices.getTotalSales().subscribe(data => {
      this.totalSales = data.totalSales;
      this.items[1].total = this.totalSales
    })

    this.salesServices.getTodaySales().subscribe(data => {
      this.totalTodaySales = data.total_sales_today;
      this.items[0].total = this.totalTodaySales; // Update totalTodaySales directly in items

    })

    this.salesServices.getAllISales().subscribe((res:any) =>{
      this.latestSales = res.data.slice(-5)
      this.allSales = res.data;
    })

    this.productServices.getAllItems().subscribe((result:any)=>{
      this.productList = result.data.slice(-5)
    })
  }



}
