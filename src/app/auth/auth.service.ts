import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { Observable, throwError, forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from './models/user.model';
import { Company } from './models/company.model';
import { Admin } from './models/admin.model';
import { environment } from '../environments/environment';

type AuthResponse = { type: 'user' | 'company' | 'admin';  data: User | Company | Admin };

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly userApi = `${environment.apiBaseUrl}/users`;
  private readonly companyApi = `${environment.apiBaseUrl}/companies`;
  private readonly adminApi = `${environment.apiBaseUrl}/admin`;
  private readonly realAuthUrl = `${environment.realApiUrl}/auth/login`;

  constructor(
    private http: HttpClient,
    private auth0: Auth0Service
  ) {}

  loginLocal(email: string, password: string): Observable<AuthResponse> {
    const loginBody = { email, password };

    return this.http.post<AuthResponse>(this.realAuthUrl, loginBody).pipe(
      catchError(err => {
        console.warn('Falha no backend. Fallback para JSON-server');

        const userReq = this.http.get<User[]>(`${this.userApi}?email=${email}&password=${password}&status=ativo`);
        const companyReq = this.http.get<Company[]>(`${this.companyApi}?email=${email}&password=${password}`);
        const adminReq = this.http.get<Admin[]>(`${this.adminApi}?email=${email}&password=${password}`);

        return forkJoin([userReq, companyReq, adminReq]).pipe(
          map(([users, companies, admin]): AuthResponse => {
            if (users.length > 0) return { type: 'user', data: users[0] };
            if (companies.length > 0) return { type: 'company', data: companies[0] };
            if (admin.length > 0) return { type: 'admin', data: admin[0] };
            throw new Error('Credenciais inválidas ou usuário inativo');
          })
        );
      })
    );
  }

  /** Login externo com Auth0 */
  loginWithAuth0(): void {
    this.auth0.loginWithRedirect({ appState: { target: '/workspace' } });
  }

  logoutAuth0(): void {
    this.auth0.logout({ returnTo: window.location.origin } as any);
  }
}
