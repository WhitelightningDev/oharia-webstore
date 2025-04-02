
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import {LoginComponent} from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
  // Pages routes
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },  // Change "Login" → "login"
  { path: "dashboard", component: DashboardComponent },// Change "Dashboard" → "dashboard"
  {path: "add-product", component: AddProductComponent},

  // Component pages
  {path: "cart", component: CartComponent}

];

