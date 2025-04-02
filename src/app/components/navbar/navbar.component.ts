import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIf],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  cartItemCount = 0; // Track the number of items in the cart
  private cartSubscription: Subscription | undefined;

  constructor(
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private readonly cartService: CartService // Inject CartService to access the cart item count
  ) {}

  ngOnInit() {
    this.checkLoginStatus();

    // Subscribe to cart item count updates
    this.cartSubscription = this.cartService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count; // Update the cart item count when it changes
    });

    // Listen for both localStorage changes and custom events
    window.addEventListener('storage', this.handleStorageChange);
    window.addEventListener('authStatusChanged', this.handleAuthChange);
  }

  ngOnDestroy() {
    // Remove event listeners to avoid memory leaks
    window.removeEventListener('storage', this.handleStorageChange);
    window.removeEventListener('authStatusChanged', this.handleAuthChange);

    // Unsubscribe from the cart item count observable to prevent memory leaks
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']); // Redirect to login page
  }

  private readonly handleStorageChange = () => {
    this.checkLoginStatus();
  };

  private readonly handleAuthChange = () => {
    setTimeout(() => this.checkLoginStatus(), 0); // Ensure token is stored before checking
  };

  checkLoginStatus() {
    const token = localStorage.getItem('authToken');
    console.log('JWT Token:', token);
    this.isLoggedIn = !!token;
    this.cdr.detectChanges();
  }

  logout() {
    localStorage.removeItem('authToken');
    this.isLoggedIn = false;
    this.router.navigate(['/']).then(() => this.checkLoginStatus());
  }
}
