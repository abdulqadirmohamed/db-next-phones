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
  
  // Method to get a product by ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

 // Method to update a product
 updateProduct(productId: number, product: Product): Observable<Product> {
  return this.http.put<Product>(`${this.apiUrl}/products/${productId}`, product);
}

  deleteProduct(id: number): Observable<Product>{
    return this.http.delete<Product>(`${this.apiUrl}/products/${id}`)
  }
}
