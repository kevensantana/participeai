import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  standalone: true,
  template: `
    <div class="callback-container">
      <div class="spinner"></div>
      <p>Redirecionando, por favor aguarde...</p>
    </div>
  `,
  styles: [`
    .callback-container {
      height: 100vh;
      background-color: var(--primary);
      color: var(--text-white);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .spinner {
      width: 50px;
      height: 50px;
      border: 6px solid rgba(255, 255, 255, 0.2);
      border-top: 6px solid var(--text-white);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 20px;
    }

    p {
      font-size: 16px;
      font-weight: bold;
      margin-top: 10px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class CallbackComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.auth.handleRedirectCallback().subscribe({
      next: (result) => {
        const target = result.appState?.target || '/workspace';
        console.log('Redirecting to:', target);
        this.router.navigateByUrl(target);
      },
      error: (err) => console.error('Erro no callback:', err)
    });
  }
}
