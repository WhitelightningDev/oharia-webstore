import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    // If there is no authToken in localStorage, redirect to login page
    if (!localStorage.getItem('authToken')) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}

