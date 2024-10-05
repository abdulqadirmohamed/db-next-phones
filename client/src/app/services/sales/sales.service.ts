import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sales } from '../../model/sales';

@Injectable({
  providedIn: 'root'
})
export class SalesService {


  
  private apiUrl = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  getAllISales(): Observable<Sales[]> {
    return this.http.get<Sales[]>(`${this.apiUrl}/sales`);
  }

  createSales(productData: Sales):Observable<Sales>{
    return this.http.post<Sales>(`${this.apiUrl}/sales`, productData)
  }

  getTotalSales(): Observable<{totalSales: number}>{
    return this.http.get<{totalSales:number}>(`${this.apiUrl}/sales/total`)
  }
  getTodaySales(): Observable<{total_sales_today: number}>{
    return this.http.get<{total_sales_today:number}>(`${this.apiUrl}/sales/todaysales`)
  }

   // Fetch sales report between two dates
   getSalesReport(startDate: string, endDate: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/sales/sales-report/?start_date=${startDate}&end_date=${endDate}`);
  }

}
