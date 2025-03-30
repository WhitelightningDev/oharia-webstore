import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // Import HttpClientModule here
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'], // Fixed 'styleUrl' to 'styleUrls'
  providers: [ProductService] // Provide ProductService if not provided globally
})
export class DashboardComponent {
  products: any[] = [];

  constructor(private readonly productService: ProductService, private readonly router: Router) {}

  ngOnInit() {
    // Check if the JWT token exists instead of using 'adminLoggedIn'
    if (!localStorage.getItem('authToken')) {
      this.router.navigate(['/login']);
      return; // Prevent further execution if not logged in
    }
    this.loadProducts();
  }


  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => (this.products = data),
      error: (err) => console.error('Error loading products:', err),
    });
  }

  addProduct() {
    this.router.navigate(['/add-product']);
  }

  editProduct(product: any) {
    this.router.navigate(['/edit-product', product.id]);
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe({
      next: () => this.loadProducts(),
      error: (err) => console.error('Error deleting product:', err),
    });
  }
}
