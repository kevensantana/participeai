import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar-waste',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar-waste.component.html',
  styleUrl: './navbar-waste.component.css'
})
export class NavbarWasteComponent {
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


  get isHelpSectionActive(): boolean {
   return this.router.url.includes('/ajuda');
  }
}
