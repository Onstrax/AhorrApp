import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../urls/apiurl';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(private http: HttpClient) {}

  register(username: string, password: string, whatsapp: string): Observable<boolean> {
    return this.http.post<boolean>(`${apiUrl}/register`, { username, password, whatsapp });
  }
  
  login(username: string, password: string, whatsapp: string): Observable<boolean> {
    return this.http.post<boolean>(`${apiUrl}/login`, { username, password, whatsapp });
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  setCurrentUser(username: string): void {
    localStorage.setItem('user', username);
  }

  getCurrentUser(): string | null {
    return localStorage.getItem('user');
  }

}
