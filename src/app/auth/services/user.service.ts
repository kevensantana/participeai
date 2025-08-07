import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserRegister } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
   private readonly apiUrl = `${environment.apiBaseUrl}/users`;  // fica /api/users

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  create(usuario: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }
  
  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  
  update(id: string, usuario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, usuario); 
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getByEmail(email: string): Observable<UserRegister[]> {
   return this.http.get<UserRegister[]>(`${this.apiUrl}?email=${email}`);
  }


  
}