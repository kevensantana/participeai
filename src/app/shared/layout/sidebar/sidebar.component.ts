import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AutoCollapseSidebarDirective } from '../../directive/auto-collapse-sidebar.directive';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule, AutoCollapseSidebarDirective],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Output() pageChange = new EventEmitter<{ title: string; subTitle?: string }>();
  @Input() sidebarCollapsed: boolean = false; // estava true
  @Input() sidebarHidden: boolean = false;

  isActive: boolean[] = [];

  onMenuClick(menu: any, subItem?: string): void {
    this.pageChange.emit({
      title: menu.title,
      subTitle: subItem?.replace('• ', '') || undefined,
    });
  }

  isCollapsed = false;

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    document.body.classList.toggle('sidebar-collapsed', this.sidebarCollapsed);
  }

}
