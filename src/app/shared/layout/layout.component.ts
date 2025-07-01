import { Component } from '@angular/core';
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { WorkspaceComponent } from '../../pages/workspace/workspace.component';
import { SearchNavBarService } from '../service/SearchNavBar/search-nav-bar.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, CommonModule, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  isSidebarCollapsed = false;

  constructor(private searchNavBarService: SearchNavBarService) {}

  onSidebarToggle(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }

  onSearch(term: string) {
    this.searchNavBarService.setSearchTerm(term);
  }
}
