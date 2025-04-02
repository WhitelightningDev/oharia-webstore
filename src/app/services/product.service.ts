import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiUrl = 'https://oharia-backend.onrender.com/api/products';

  constructor(private readonly http: HttpClient) {}

  // Retrieve the JWT token from localStorage
  private getAuthToken(): string | null {
    return localStorage.getItem('authToken');  // Ensure this matches the key in localStorage
  }

  // Method to get products filtered by category
getProductsByCategory(category: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}?category=${category}`, {
    headers: this.createAuthHeaders()  // Add headers with the token
  });
}


  // Create headers including the Authorization token
  private createAuthHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''  // Include Bearer token if available
    });
  }

  // Method to handle adding a product with an image (via FormData)
  addProductWithImage(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData, {
      headers: this.createAuthHeaders()  // Only include Authorization header
    });
  }

  // Get all products
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, {
      headers: this.createAuthHeaders()  // Add headers with the token
    });
  }

  // Get Vitality products
  getVitalityProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?category=vitality`, {
      headers: this.createAuthHeaders()  // Add headers with the token
    });
  }

  // Get Essence products
  getEssenceProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?category=essence`, {
      headers: this.createAuthHeaders()  // Add headers with the token
    });
  }

  // Get Canna products
  getCannaProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?category=canna`, {
      headers: this.createAuthHeaders()  // Add headers with the token
    });
  }

  // Update product details
  updateProduct(id: string, product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, product, {
      headers: this.createAuthHeaders()  // Add headers with the token
    });
  }

  // Delete a product
  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, {
      headers: this.createAuthHeaders()  // Add headers with the token
    });
  }
  
}
