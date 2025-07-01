import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

export interface Product {
  id: string;
  type: string;
  title: string;
  description: string;
  icon: string;
  features?: string[];
  stats?: {
    value: string;
    label: string;
  };
  isActive: boolean;
  isExpanded: boolean; // Removido o "?" para tornar obrigatório
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() isExpanded!: boolean;
  @Input() isActive!: boolean;

  constructor(private router: Router) {}

  private routeMap: Record<string, string> = {
    food: '/store',
  };

  goToSection(): void {
    const route = this.routeMap[this.product.type];
    if (route) {
      this.router.navigate([route]);
    } else {
      console.warn(`Rota não definida para o tipo: ${this.product.type}`);
    }
  }

  toggleExpand(): void {
    if (this.isActive) {
      this.isExpanded = !this.isExpanded;
    }
  }
}
