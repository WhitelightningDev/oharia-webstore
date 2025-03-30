import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiUrl = 'http://localhost:5000/api/products';

  constructor(private readonly http: HttpClient) {}

  // Retrieve the JWT token from localStorage
  private getAuthToken(): string | null {
    return localStorage.getItem('authToken');  // Ensure this matches the key in localStorage
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

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, {
      headers: this.createAuthHeaders()  // Add headers with the token
    });
  }

  updateProduct(id: string, product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, product, {
      headers: this.createAuthHeaders()  // Add headers with the token
    });
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, {
      headers: this.createAuthHeaders()  // Add headers with the token
    });
  }
}
