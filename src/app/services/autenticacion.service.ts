// src/app/services/atenticacion.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AtenticacionService {
  private isAuthenticated = false;
  private currentUser: string | null = null;

  login(username: string, password: string): boolean {
    if (username === 'user' && password === 'password') {
      this.isAuthenticated = true;
      this.currentUser = username;
      localStorage.setItem('user', username);
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.currentUser = null;
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated || localStorage.getItem('user') !== null;
  }

  getCurrentUser(): string | null {
    return this.currentUser || localStorage.getItem('user');
  }
}
