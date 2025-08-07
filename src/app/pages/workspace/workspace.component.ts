import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ProductCardComponent, Product } from './product-card/product-card.component';
import { CarouselComponent } from './carousel/carousel.component';
import { Subscription } from 'rxjs';
import { SearchNavBarService } from '../../shared/service/SearchNavBar/search-nav-bar.service';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, CarouselComponent],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.css'
})
export class WorkspaceComponent implements OnInit, OnDestroy {

  constructor(private searchNavBarService: SearchNavBarService) {}

  products: Product[] = [
    {
      id: 'food',
      type: 'food',
      title: 'Alimentos',
      description: 'Controle eficiente de alimentos',
      icon: 'fa-solid fa-truck-fast',
      features: [
        'Redistribuição eficiente',
        'Leilão inteligente',
        'Gestão de estoque'
      ],
      stats: {
        value: '89%',
        label: 'Redução de desperdício'
      },
      isActive: true,
      isExpanded: true
    },
    {
      id: 'water',
      type: 'water',
      title: 'Água',
      description: 'Gestão inteligente de água',
      icon: 'fa-solid fa-droplet',
      isActive: false,
      isExpanded: false
    },
    {
      id: 'energy',
      type: 'energy',
      title: 'Energia',
      description: 'Gestão do consumo energético',
      icon: 'fa-solid fa-lightbulb',
      isActive: false,
      isExpanded: false
    },
    {
      id: 'waste',
      type: 'waste',
      title: 'Resíduos',
      description: 'Gestão sustentável de resíduos',
      icon: 'fa-solid fa-trash',
      isActive: true,
      isExpanded: true
    }
  ];

  filteredProducts: Product[] = [];
  searchSub!: Subscription;

 ngOnInit(): void {
    this.filteredProducts = this.products;
    this.searchSub = this.searchNavBarService.searchTerm$.subscribe(term => {
      this.applySearchFilter(term);
    });
  }

  applySearchFilter(term: string) {
    const lower = term.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(lower) ||
      product.description.toLowerCase().includes(lower) ||
      product.type.toLowerCase().includes(lower)
    );
  }

  ngOnDestroy(): void {
    this.searchSub.unsubscribe();
  }

  toggleProduct(productId: string) {
    const product = this.products.find(p => p.id === productId);
    if (product && product.isActive) {
      product.isExpanded = !product.isExpanded;
    }
  }
}
