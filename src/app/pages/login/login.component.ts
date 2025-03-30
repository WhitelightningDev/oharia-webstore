import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  loginUrl = 'http://localhost:5000/api/auth/login';  // Your API URL

  constructor(private readonly router: Router, private readonly http: HttpClient) {}

  login() {
    const credentials = {
      username: this.username,
      password: this.password
    };

    this.http.post<any>(this.loginUrl, credentials).subscribe(
      response => {
        console.log('Login successful', response);

        // Store JWT token in localStorage
        localStorage.setItem('authToken', response.token);

        // Dispatch a custom event to notify other components
        window.dispatchEvent(new Event('authStatusChanged'));

        // Delay navigation slightly to ensure token storage is completed
        console.log('Navigating to dashboard...');
        this.router.navigateByUrl('/dashboard').then(success => {
          if (!success) {
            console.error('Navigation to /dashboard failed');
          } else {
            console.log('Navigation to /dashboard succeeded');
          }
        });
      },
      error => {
        console.error('Login failed', error);
        alert('Invalid credentials');
      }
    );

  }
}
