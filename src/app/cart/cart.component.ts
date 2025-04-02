import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule], // ✅ Make sure CommonModule is imported
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private readonly cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems(); // ✅ Get all cart items
  }

  removeItem(index: number) {
    this.cartService.removeFromCart(index);
    this.cartItems = this.cartService.getCartItems(); // ✅ Refresh the list after removing
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = []; // ✅ Empty the array
  }
}
