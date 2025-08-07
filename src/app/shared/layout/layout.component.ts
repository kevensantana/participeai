import { Component } from '@angular/core';
import { NavbarComponent } from "./navbar/navbar.component";
import { CommonModule } from "@angular/common";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { SearchNavBarService } from '../service/SearchNavBar/search-nav-bar.service';
import { NavbarFoodComponent } from './navbar/navbar-food/navbar-food.component';
import { NavbarWasteComponent } from "./navbar/navbar-waste/navbar-waste.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NavbarComponent, CommonModule, RouterOutlet, NavbarFoodComponent, NavbarWasteComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  isWorkspace = false;
  isStore = false;
  isAdicionaProduto = false;
  isWaste = false;
  isCalculator = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        this.isWorkspace = url.startsWith('/workspace') || url.startsWith('/faq');
        this.isStore = url.startsWith('/store');
        this.isAdicionaProduto = url.startsWith('/adicionaProduto');
        this.isWaste = url.startsWith('/map');
        this.isCalculator = url.startsWith('/calculator');
      }
    });
  }
}
