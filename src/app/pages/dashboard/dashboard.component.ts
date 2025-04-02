import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppConfirmPopupComponent } from '../../popups/confirm-popup/confirm-popup.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, AppConfirmPopupComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ProductService]
})
export class DashboardComponent {
  vitalityProducts: any[] = [];
  essenceProducts: any[] = [];
  cannaProducts: any[] = [];
  loadingVitality: boolean = true;
  loadingEssence: boolean = true;
  loadingCanna: boolean = true;
  showPopup: boolean = false;  // To control popup visibility
  popupMessage: string = '';   // Message to display in popup
  productToDeleteId: string | null = null;  // Track product ID to delete

  constructor(private readonly productService: ProductService, private readonly router: Router) {}

  ngOnInit() {
    if (!localStorage.getItem('authToken')) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadProductsByCategory('Vitality');
    this.loadProductsByCategory('Essence');
    this.loadProductsByCategory('Canna');
  }

  loadProductsByCategory(category: string) {
    this.loading(category, true);
    this.productService.getProductsByCategory(category).subscribe({
      next: (data) => {
        console.log('Products loaded:', data);  // Log the products to verify the structure
        this.assignProductsToCategory(category, data);
        this.loading(category, false);
      },
      error: (err) => {
        console.error(`Error loading ${category} products:`, err);
        this.loading(category, false);
      }
    });
  }

  loading(category: string, status: boolean) {
    if (category === 'Vitality') {
      this.loadingVitality = status;
    } else if (category === 'Essence') {
      this.loadingEssence = status;
    } else if (category === 'Canna') {
      this.loadingCanna = status;
    }
  }

  assignProductsToCategory(category: string, data: any[]) {
    if (category === 'Vitality') {
      this.vitalityProducts = data;
    } else if (category === 'Essence') {
      this.essenceProducts = data;
    } else if (category === 'Canna') {
      this.cannaProducts = data;
    }
  }

  addProduct() {
    this.router.navigate(['/add-product']);
  }

  editProduct(product: any) {
    this.router.navigate(['/edit-product', product.id]); // Edit product functionality
  }

  // This is the corrected delete method
  deleteProduct(id: string) {
    // Store the product ID to be deleted
    this.productToDeleteId = id;
    // Set the popup message and show it
    this.popupMessage = 'Are you sure you want to delete this product?';
    this.showPopup = true;
  }

  // This method handles the result from the popup
  handlePopupResult(confirmed: boolean) {
    if (confirmed && this.productToDeleteId) {
      // Proceed with deletion using the correct ID
      this.productService.deleteProduct(this.productToDeleteId).subscribe({
        next: () => {
          // Reload all categories after deletion
          this.loadProductsByCategory('Vitality');
          this.loadProductsByCategory('Essence');
          this.loadProductsByCategory('Canna');
        },
        error: (err) => console.error('Error deleting product:', err)
      });
    } else {
      // Handle cancellation
      console.log('Deletion cancelled');
    }
    this.showPopup = false; // Close the popup
    this.productToDeleteId = null; // Reset the ID after operation
  }
}
