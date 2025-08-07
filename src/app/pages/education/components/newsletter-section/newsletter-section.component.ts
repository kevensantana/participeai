import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-newsletter-section',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './newsletter-section.component.html',
  styleUrl: './newsletter-section.component.css'
})
export class NewsletterSectionComponent {
emailControl = new FormControl('', [Validators.required, Validators.email]);
  isSubmitting = false;
  isSubmitted = false;

  onSubmit(): void {
    if (this.emailControl.valid) {
      this.isSubmitting = true;
      
      // Simular envio
      setTimeout(() => {
        this.isSubmitting = false;
        this.isSubmitted = true;
        this.emailControl.reset();
        
        // Reset success message after 3 seconds
        setTimeout(() => {
          this.isSubmitted = false;
        }, 3000);
      }, 1500);
    } else {
      this.emailControl.markAsTouched();
    }
  }

}
