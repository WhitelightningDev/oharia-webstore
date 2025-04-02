import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];

  constructor() {}

  // ✅ Add product to the cart without replacing existing items
  addToCart(product: any) {
    this.cartItems.push(product); // ✅ Push new items instead of replacing
    console.log('Cart updated:', this.cartItems);
  }

  // ✅ Get all items in the cart
  getCartItems() {
    return this.cartItems;
  }

  // ✅ Remove a specific item from the cart
  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
  }

  // ✅ Clear the entire cart
  clearCart() {
    this.cartItems = [];
  }
}
