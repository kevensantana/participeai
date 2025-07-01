import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() search = new EventEmitter<string>();

  isMenuOpen = false;

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.search.emit(input.value.toLowerCase());
  }
}
