import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgIf],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn = false;

  constructor(private readonly router: Router, private readonly cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.checkLoginStatus();

    // Listen for both localStorage changes and custom events
    window.addEventListener('storage', this.handleStorageChange);
    window.addEventListener('authStatusChanged', this.handleAuthChange);
  }
  navigateToLogin() {
    this.router.navigate(['/login']); // Redirect to login page
  }


  ngOnDestroy() {
    // Remove event listeners to avoid memory leaks
    window.removeEventListener('storage', this.handleStorageChange);
    window.removeEventListener('authStatusChanged', this.handleAuthChange);
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
