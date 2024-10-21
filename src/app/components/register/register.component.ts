import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string | null = null;
  show: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AutenticacionService,
    private router: Router
  ) {}

  volver(): void {
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirm: ['', Validators.required],
      whatsapp: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { username, password, confirm, whatsapp } = this.registerForm.value;
      if (password != confirm) {
        Swal.fire({
          title: '¡Oops!',
          text: 'Tu contraseña y su confirmación no coinciden, corrígelo y prueba de nuevo.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        this.registerForm.patchValue({
          password: '',
          confirm: '',
        });
      } else {
        this.authService
          .register(username, password, whatsapp)
          .subscribe((success: boolean) => {
            if (success) {
              Swal.fire({
                title: '!Registrado!',
                text: 'Todo en orden, ahora inicia sesión con el usuario y contraseña que creaste.',
                icon: 'success',
                confirmButtonText: 'OK',
              });
              this.router.navigate(['/login']); // Redirigir a la página de login
            } else {
              Swal.fire({
                title: '¡Oops!',
                text: 'Parece que ese usuario ya existe, prueba de nuevo con otro username.',
                icon: 'error',
                confirmButtonText: 'OK',
              });
              this.registerForm.reset({
                username: '',
                password: '',
                confirm: '',
              });
            }
          });
      }
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
