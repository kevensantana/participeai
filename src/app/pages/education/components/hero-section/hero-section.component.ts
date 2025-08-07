import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {
  categories = [
      { icon: '🌿', name: 'Alimentos' },
      { icon: '🗑️', name: 'Resíduos' },
      { icon: '💧', name: 'Água' },
      { icon: '⚡', name: 'Energia' }
  ];
}
