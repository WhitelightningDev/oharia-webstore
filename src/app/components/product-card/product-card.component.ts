import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product: any; // Receive product data from parent component

  addToCart(product: any) {
    console.log('Added to cart:', product);
    // Implement cart logic here
  }

}

