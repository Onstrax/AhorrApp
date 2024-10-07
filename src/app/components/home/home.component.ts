import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service'; // Asegúrate de importar el servicio

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    private router: Router,
    private authService: AutenticacionService
  ) {}

  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }

  getUser(): string {
    return this.authService.getCurrentUser()!;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
