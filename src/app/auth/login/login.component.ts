import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';  
import { AuthService as Auth0Service } from '@auth0/auth0-angular'; 

import { finalize } from 'rxjs/operators'; 
import { environment } from '../../environments/environment';  
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  loading: boolean = false;

  private router = inject(Router); 
  private auth0 = inject(Auth0Service);  
  private http = inject(HttpClient);
  private snackBar = inject(MatSnackBar);

  private showNotification(message: string, action: string = 'Fechar') {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

    loginLocal(): void {
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');

      const emailEmpty = !this.email.trim();
      const passwordEmpty = !this.password.trim();

      if (emailEmpty || passwordEmpty) {
        if (emailEmpty && emailInput) emailInput.classList.add('input-error');
        if (passwordEmpty && passwordInput) passwordInput.classList.add('input-error');

        this.showNotification('Por favor, preencha todos os campos.');
        return;
      }

    if (emailInput) emailInput.classList.remove('input-error');
    if (passwordInput) passwordInput.classList.remove('input-error');

    this.loading = true;
    this.http.get<any[]>(`${environment.apiBaseUrl}/users?email=${this.email}&password=${this.password}`)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (users) => {
          if (users.length > 0) {
            this.showNotification('Login bem-sucedido!');
            this.router.navigate(['/workspace']);
          } else {
            this.showNotification('Credenciais inválidas!');
          }
        },
        error: (err: HttpErrorResponse) => {
          this.showNotification(`Erro ao tentar fazer login: ${err.message}`);
        }
      });
   }


  loginAuth0(): void {
    this.loading = true;
    this.auth0.loginWithRedirect({ appState: { target: '/workspace' } })
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        error: (err: HttpErrorResponse) => {  
          console.error('Erro ao tentar login com Auth0', err);
          this.showNotification('Erro ao tentar login com Auth0');
        }
      });
  }

  onFocus(event: FocusEvent) {
    const input = event.target as HTMLInputElement;
    input.classList.add('active');
  }

  onBlur(event: FocusEvent) {
    const input = event.target as HTMLInputElement;
    if (!input.value) {
      input.classList.remove('active');
    }
  }
}
