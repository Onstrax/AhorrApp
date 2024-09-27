import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AtenticacionService } from '../../services/autenticacion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginFailed = false;

  constructor(private autenticacionService: AtenticacionService, private router: Router) {}

  onSubmit() {
    const success = this.autenticacionService.login(this.username, this.password);
    if (success) {
      this.router.navigate(['/gastos']);
    } else {
      this.loginFailed = true;
    }
  }
}
