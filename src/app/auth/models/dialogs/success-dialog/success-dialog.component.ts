import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

export interface SuccessDialogData {
  message: string;
  title?: string;
}

@Component({
  selector: 'app-success-dialog',
  standalone: true,
  templateUrl: './success-dialog.component.html', 
  styleUrls: ['./success-dialog.component.css'], 
  imports: [CommonModule, MatButtonModule]
})
export class SuccessDialogComponent implements OnInit {
  countdown = 5;

  constructor(
    private dialogRef: MatDialogRef<SuccessDialogComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: SuccessDialogData
  ) {}

  ngOnInit(): void {
    const interval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(interval);
        this.goToLogin();
      }
    }, 500);
  }

  goToLogin(): void {
    this.dialogRef.close();
    this.router.navigate(['/login']);
  }
}