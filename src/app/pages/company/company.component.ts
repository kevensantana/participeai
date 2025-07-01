import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ServiceDialogComponent } from '../landing/service-dialog/service-dialog.component';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent implements AfterViewInit {

  constructor(private route: ActivatedRoute, private dialog: MatDialog) {}

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngAfterViewInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  openDialog(serviceType: string): void {
    this.dialog.open(ServiceDialogComponent, {
      data: { type: serviceType }
    });
  }
}
