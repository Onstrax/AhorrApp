import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GastosService } from '../../services/gastos.service';
import Swal from 'sweetalert2';
import { GastoOcasional } from '../../models/gasto.model';

@Component({
  selector: 'app-gastos-ocasionales-form',
  templateUrl: './gastos-ocasionales-form.component.html',
  styleUrls: ['./gastos-ocasionales-form.component.css'],
})
export class GastosOcasionalesFormComponent implements OnInit {
  gastosOcasionalesForm!: FormGroup;
  total: number = 0;
  nuevaCategoria: string = '';
  nuevoMetodoPago: string = '';

  categorias: string[] = [];
  metodosPago: string[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private gastosService: GastosService
  ) {}

  ngOnInit(): void {
    this.gastosOcasionalesForm = this.fb.group({
      necesidad: ['', Validators.required],
      categoria: ['', Validators.required],
      producto: [''],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      costoUnidad: [0, [Validators.required, Validators.min(0)]],
      fechaPago: ['', Validators.required],
      metodoPago: ['', Validators.required],
    });

    // Calcular el total automáticamente cuando cambian la cantidad o el costo por unidad
    this.gastosOcasionalesForm
      .get('cantidad')
      ?.valueChanges.subscribe(() => this.calcularTotal());
    this.gastosOcasionalesForm
      .get('costoUnidad')
      ?.valueChanges.subscribe(() => this.calcularTotal());

    this.updatePreferences();
  }

  updatePreferences() {
    this.gastosService
      .obtenerPreferencias('categorias_ocasionales')
      .subscribe((categorias: string[]) => {
        this.categorias = categorias;
      });
    this.gastosService
      .obtenerPreferencias('metodos_pago')
      .subscribe((metodos: string[]) => {
        this.metodosPago = metodos;
      });
  }

  calcularTotal(): void {
    const cantidad = this.gastosOcasionalesForm.get('cantidad')?.value || 0;
    const costoUnidad =
      this.gastosOcasionalesForm.get('costoUnidad')?.value || 0;
    this.total = cantidad * costoUnidad;
  }

  modificarPreferencia(
    accion: string,
    preferencia: string,
    tipo: string
  ): void {
    let valor: string;
    if (tipo == 'categoria') {
      valor = this.nuevaCategoria;
    } else {
      valor = this.nuevoMetodoPago;
    }
    if (valor != '') {
      this.gastosService
        .modificarPreferencia(accion, preferencia, valor)
        .subscribe((respuesta: string) => {
          if (respuesta == 'success') {
            Swal.fire({
              title: '¡Hecho!',
              text: 'Operación exitosa.',
              icon: 'success',
              confirmButtonText: 'OK',
            });
            this.nuevaCategoria = '';
            this.nuevoMetodoPago = '';
            this.updatePreferences();
          } else if (respuesta == 'existing') {
            Swal.fire({
              title: '¡Oops!',
              text: 'Digita un opción que aún no exista y prueba de nuevo',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          } else {
            Swal.fire({
              title: 'Lo sentimos',
              text: 'Hubo un error en el servidor, intenta de nuevo más tarde',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
        });
    } else {
      Swal.fire({
        title: 'Campo incompleto',
        text: 'Escribe algo y prueba de nuevo.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }

  volver(): void {
    this.router.navigate(['/home']);
  }

  onSubmit(): void {
    //console.log(this.gastosOcasionalesForm.value); // Aquí llamaremos al servicio para enviar los datos al backend
    if (this.gastosOcasionalesForm.valid) {
      const {
        necesidad,
        categoria,
        producto,
        cantidad,
        costoUnidad,
        fechaPago,
        metodoPago,
      } = this.gastosOcasionalesForm.value;
      const necesario: boolean = necesidad == 'necesidad' ? true : false;
      const gasto: GastoOcasional = {
        esNecesidad: necesario,
        categoria: categoria,
        producto: producto,
        cantidad: cantidad,
        costoPorUnidad: costoUnidad,
        fecha: fechaPago,
        metodoPago: metodoPago,
        monto: this.total,
      };
      this.gastosService
        .registrarGastoOcasional(gasto)
        .subscribe((success: boolean) => {
          if (success) {
            Swal.fire({
              title: 'Todo listo!',
              text: 'Tu gasto se registró correctamente.',
              icon: 'success',
              confirmButtonText: 'OK',
            });
            this.gastosOcasionalesForm.reset({
              necesidad: '',
              categoria: '',
              producto: '',
              cantidad: 1,
              costoUnidad: 0,
              fechaPago: '',
              metodoPago: '',
            });
            this.total = 0;
          } else {
            Swal.fire({
              title: 'Lo sentimos',
              text: 'Algo salió mal, prueba de nuevo más tarde.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
        });
    } else {
      Swal.fire({
        title: '¡Campos incompletos!',
        text: 'Aún hay campos vacíos. Asegúrate de llenar todos los campos con un "*" y prueba de nuevo.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }
}
