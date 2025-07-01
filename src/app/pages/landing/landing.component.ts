import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { ServiceDialogComponent } from './service-dialog/service-dialog.component';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterModule, CommonModule, MatDialogModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

  constructor(private dialog: MatDialog) {}

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  openDialog(serviceType: string): void {
    this.dialog.open(ServiceDialogComponent, {
      data: { type: serviceType }
    });
  }
}
