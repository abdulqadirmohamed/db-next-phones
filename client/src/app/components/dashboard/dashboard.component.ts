import { Component, inject, OnInit } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { IncomeExpenseChartComponent } from "../../charts/income-expense-chart/income-expense-chart.component";
import { CustomersService } from '../../services/customers/customers.service';
import { SalesService } from '../../services/sales/sales.service';
import { AuthService } from '../../services/auth/auth.service';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LucideAngularModule, IncomeExpenseChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  usersList:any[] = []

  totalProducts: number = 0
  totalCustomers: number = 0;
  totalSales: number = 0;
  totalTodaySales: number = 0;

  customerServices = inject(CustomersService)
  salesServices = inject(SalesService)
  productServices = inject(ProductService)

  authService = inject(AuthService)

  ngOnInit(): void {

    this.authService.getAllUsers().subscribe((res:any)=> {
      this.usersList = res.result
    })

    this.productServices.getTotalProducts().subscribe(data => {
      this.totalProducts = data.totalProducts;
    });

    this.customerServices.getTotalCustomers().subscribe(data => {
      this.totalCustomers = data.totalCustomers;
    });

    this.salesServices.getTotalSales().subscribe(data => {
      this.totalSales = data.totalSales
    })

    this.salesServices.getTodaySales().subscribe(data => {
      this.totalTodaySales = data.total_sales_today
    })
  }

}
