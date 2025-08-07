import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar-food',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar-food.component.html',
  styleUrl: './navbar-food.component.css'
})
export class NavbarFoodComponent {
 productDropdownOpen = false;
  profileMenuOpen = false;
  mobileMenuOpen = false;

   constructor(private router: Router) {}

  toggleProductDropdown() {
    this.productDropdownOpen = !this.productDropdownOpen;
  }

  toggleProfileMenu() {
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeAllMenus() {
    this.productDropdownOpen = false;
    this.profileMenuOpen = false;
    this.mobileMenuOpen = false;
  }

   get isProductSectionActive(): boolean {
    return this.router.url.startsWith('/store') ||
           this.router.url.startsWith('/produtos') ||
           this.router.url.includes('/produtos');
  }

  get isHelpSectionActive(): boolean {
  return this.router.url.includes('/ajuda');
}
}
