import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AtenticacionService } from '../services/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionGuard implements CanActivate {
  constructor(private autenticacionService: AtenticacionService, private router: Router) {}

  canActivate(): boolean {
    if (this.autenticacionService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']); // Redirigir a la página de login si no está autenticado
    return false;
  }
}
