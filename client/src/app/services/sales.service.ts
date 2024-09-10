import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesService {


  
  private apiUrl = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  // getAllItems(): Observable<Customers[]> {
  //   return this.http.get<Customers[]>(`${this.apiUrl}/sales`);
  // }

  // createCustomer(customerData: Customers): Observable<Customers> {
  //   return this.http.post<Customers>(`${this.apiUrl}/sales`, customerData);
  // }

  getTotalSales(): Observable<{totalSales: number}>{
    return this.http.get<{totalSales:number}>(`${this.apiUrl}/sales/total`)
  }
  getTodaySales(): Observable<{total_sales_today: number}>{
    return this.http.get<{total_sales_today:number}>(`${this.apiUrl}/sales/todaysales`)
  }

}
