import { Component, OnInit } from '@angular/core';
import { CheckboxControlValueAccessor, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null;
  show: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AutenticacionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }  

  register(): void {
    this.router.navigate(['/register']);
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe(
        (success: boolean) => {
          if (success) {
            this.authService.setCurrentUser(username);
            this.router.navigate(['/home']);  // Redirigir a la página de inicio si el login es exitoso
          } else {
            Swal.fire({
              title: '¡Oops!',
              text: 'El usuario o la contraseña son incorrectos.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
            this.loginForm.patchValue({
              password: ''
            });            
          }
        },
        error => {
          Swal.fire({
            title: 'Lo sentimos!',
            text: 'Error en el servidor. Intente nuevamente.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          this.errorMessage = 'Error en el servidor. Intente nuevamente.';
        }
      );
    }
    else {
      Swal.fire({
        title: 'Campos incompletos!',
        text: 'Llena todos los campos y prueba nuevamente.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }
}
