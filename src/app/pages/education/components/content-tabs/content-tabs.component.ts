import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-content-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content-tabs.component.html',
  styleUrl: './content-tabs.component.css'
})
export class ContentTabsComponent {
activeTab = 'food-waste';

  tabs = [
    {
      id: 'food-waste',
      title: 'Desperdício de Alimentos',
      icon: '🌿',
      color: '#4CAF50'
    },
    {
      id: 'waste-disposal',
      title: 'Descarte Incorreto de Resíduos',
      icon: '🗑️',
      color: '#8A6240'
    },
    {
      id: 'water-consumption',
      title: 'Consumo de Água',
      icon: '💧',
      color: '#00796B'
    },
    {
      id: 'energy-consumption',
      title: 'Consumo de Energia',
      icon: '⚡',
      color: '#AAA713'
    }
  ];

  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }
}
