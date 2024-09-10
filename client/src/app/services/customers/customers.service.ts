import { HttpClient } from '@angular/common/http';
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

  // Function to send form data to backend
  createCustomer(customerData: Customers): Observable<Customers> {
    return this.http.post<Customers>(`${this.apiUrl}/customers`, customerData);
  }
}
