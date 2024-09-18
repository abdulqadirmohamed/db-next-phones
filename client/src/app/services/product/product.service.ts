import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../model/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private apiUrl = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  getAllItems(): Observable<{ data: Product[] }> {
    return this.http.get<{ data: Product[] }>(`${this.apiUrl}/products`);
  }

  createProduct(productData: Product):Observable<Product>{
    return this.http.post<Product>(`${this.apiUrl}/products`, productData)
  }

  getTotalProducts(): Observable<{totalProducts: number}>{
    return this.http.get<{totalProducts:number}>(`${this.apiUrl}/products/total`)
  }
}
