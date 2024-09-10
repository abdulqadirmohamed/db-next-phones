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

  getAllItems(): Observable<{ data: Customers[] }> {
    return this.http.get<{ data: Customers[] }>(`${this.apiUrl}/customers`);
  }
}
