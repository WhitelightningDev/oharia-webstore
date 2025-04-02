import { Component, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product: any;
  showToast: boolean = false; // ✅ State for showing the toast

  constructor(private cartService: CartService) {}

  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.showToast = true; // ✅ Show the toast
    setTimeout(() => {
      this.showToast = false; // ✅ Hide toast after 3 seconds
    }, 3000);
  }
}
