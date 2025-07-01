import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

export interface ErrorDialogData {
  title: string;
  message: string;
  details?: string[];
}

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './error-dialog.component.html', 
  styleUrls: ['./error-dialog.component.css'] 
})
export class ErrorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ErrorDialogData
  ) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }
}