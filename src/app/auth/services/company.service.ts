import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private readonly apiUrl = `${environment.apiBaseUrl}/companies`;
  
  constructor(private http: HttpClient) {}

  listarEmpresas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  adicionarEmpresa(empresa: any): Observable<any> {
    return this.http.post(this.apiUrl, empresa);
  }

  atualizarEmpresa(id: string, empresa: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, empresa);
  }

  deletarEmpresa(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
