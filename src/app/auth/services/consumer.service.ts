import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConsumerService {
 private readonly apiUrl = `${environment.apiBaseUrl}/consumers`;

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  listarConsumidores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  adicionarConsumidor(consumidor: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, consumidor);
  }

  editarConsumidor(id: string, consumidor: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, consumidor);
  }

  deletarConsumidor(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  obterConsumidor(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
