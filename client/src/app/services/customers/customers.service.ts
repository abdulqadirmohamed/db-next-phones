import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customers } from '../../model/customers';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {


  private apiUrl = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  getAllItems(): Observable<Customers[]> {
    return this.http.get<Customers[]>(`${this.apiUrl}/customers`);
  }

  createCustomer(customerData: Customers): Observable<Customers> {
    return this.http.post<Customers>(`${this.apiUrl}/customers`, customerData);
  }

  getTotalCustomers(): Observable<{ totalCustomers: number }> {
    return this.http.get<{ totalCustomers: number }>(`${this.apiUrl}/customers/total`)
  }
  // Method to update a customer
  updateCustomer(id: number, customer:Customers): Observable<Customers> {
    return this.http.put<Customers>(`${this.apiUrl}/customers/${id}`, customer);
  }

  // Method to get a customer by ID
  getCustomerById(id: number): Observable<Customers> {
    return this.http.get<Customers>(`${this.apiUrl}/customers/${id}`);
  }

  deletCustomer(id: number): Observable<Customers> {
    return this.http.delete<Customers>(`${this.apiUrl}/customers/${id}`)
  }
}
