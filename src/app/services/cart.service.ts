import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = []; // Local cart items storage
  private readonly cartItemCount = new BehaviorSubject<number>(0); // Observable for cart item count

  cartItemCount$ = this.cartItemCount.asObservable(); // Expose cart item count as an observable

  constructor() {
    // Load cart from localStorage on app startup
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartItems = savedCart;
    this.cartItemCount.next(this.cartItems.length); // Update the count on load
  }

  // Add a product to the cart
  addToCart(product: any) {
    this.cartItems.push(product); // Add product to cart array
    this.updateLocalStorage();
    this.cartItemCount.next(this.cartItems.length); // Update cart item count
    console.log('Cart updated:', this.cartItems);
  }

  // Get all items in the cart
  getCartItems() {
    return this.cartItems;
  }

  // Remove a specific item from the cart
  removeFromCart(index: number) {
    this.cartItems.splice(index, 1); // Remove item at specified index
    this.updateLocalStorage();
    this.cartItemCount.next(this.cartItems.length); // Update cart item count
  }

  // Clear the entire cart
  clearCart() {
    this.cartItems = [];
    this.updateLocalStorage();
    this.cartItemCount.next(0); // Update cart item count
  }

  // Private method to update localStorage whenever the cart changes
  private updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
}
