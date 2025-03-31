import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule], // Import FormsModule for form handling
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  // Define categories array to populate the dropdown
  categories: string[] = ['Vitality', 'Essence', 'Canna'];

  product = {
    name: '',
    shortdescription: '',
    description: '',
    price: 0,
    category: '', // Ensure this matches the dropdown value binding
    stock: 0,
  };

  imageFile: File | null = null; // To store the selected image file

  constructor(private readonly productService: ProductService, private readonly router: Router) {}

  // Handle the image file input change event
  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file; // Store the selected file
    }
  }

  // Add product including the image
  addProduct() {
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('shortdescription', this.product.shortdescription);
    formData.append('description', this.product.description);
    formData.append('price', this.product.price.toString());
    formData.append('category', this.product.category); // Send selected category
    formData.append('stock', this.product.stock.toString());

    // Append the image if it's selected
    if (this.imageFile) {
      formData.append('image', this.imageFile, this.imageFile.name);
    }

    this.productService.addProductWithImage(formData).subscribe({
      next: () => {
        alert('Product added successfully!');
        this.router.navigate(['/']); // Redirect to Dashboard
      },
      error: (err) => {
        console.error('Error adding product:', err);
        alert('Error adding product. Please try again.');
      }
    });
  }
}
