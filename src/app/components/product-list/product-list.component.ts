import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';

interface Product {
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'Vitality' | 'Essence' | 'Canna';
  stock: number;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  vitalityProducts: Product[] = [];
  essenceProducts: Product[] = [];
  cannaProducts: Product[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Product[]>('http://localhost:5000/api/products') // ✅ Explicitly define response as Product[]
      .subscribe((data) => {
        this.vitalityProducts = data.filter(product => product.category === 'Vitality');
        this.essenceProducts = data.filter(product => product.category === 'Essence');
        this.cannaProducts = data.filter(product => product.category === 'Canna');
      }, error => {
        console.error('Error fetching products:', error);
      });
  }
}
