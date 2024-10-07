import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GastoFijo } from '../../models/gasto.model';
import { GastosService } from '../../services/gastos.service';

@Component({
  selector: 'app-gastos-fijos-form',
  templateUrl: './gastos-fijos-form.component.html',
  styleUrls: ['./gastos-fijos-form.component.css'],
})
export class GastosFijosFormComponent implements OnInit {
  gastosFijosForm!: FormGroup;
  total: number = 0;
  nuevaCategoria: string = '';
  nuevoMetodoPago: string = '';
  nuevoPeriodo: string = '';

  categorias: string[] = [];
  metodosPago: string[] = [];
  periodos: string[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private gastosService: GastosService
  ) {}

  ngOnInit(): void {
    this.gastosFijosForm = this.fb.group({
      necesidad: ['', Validators.required],
      categoria: ['', Validators.required],
      producto: [''],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      costoUnidad: [0, [Validators.required, Validators.min(0)]],
      periodicidad: ['', Validators.required],
      fechaPago: ['', Validators.required],
      metodoPago: ['', Validators.required],
    });

    // Calcular el total automáticamente cuando cambian la cantidad o el costo por unidad
    this.gastosFijosForm
      .get('cantidad')
      ?.valueChanges.subscribe(() => this.calcularTotal());
    this.gastosFijosForm
      .get('costoUnidad')
      ?.valueChanges.subscribe(() => this.calcularTotal());

    this.updatePreferences();
  }

  updatePreferences() {
    this.gastosService
      .obtenerPreferencias('categorias_fijas')
      .subscribe((categorias: string[]) => {
        this.categorias = categorias;
      });
    this.gastosService
      .obtenerPreferencias('metodos_pago')
      .subscribe((metodos: string[]) => {
        this.metodosPago = metodos;
      });
    this.gastosService
      .obtenerPreferencias('periodos')
      .subscribe((periodos: string[]) => {
        this.periodos = periodos;
      });
  }

  calcularTotal(): void {
    const cantidad = this.gastosFijosForm.get('cantidad')?.value || 0;
    const costoUnidad = this.gastosFijosForm.get('costoUnidad')?.value || 0;
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
    } else if (tipo == 'pago') {
      valor = this.nuevoMetodoPago;
    } else {
      valor = this.nuevoPeriodo;
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
            this.nuevoPeriodo = '';
            this.updatePreferences();
          } else if (respuesta == 'existing') {
            let str = accion == 'delete' ? '' : 'aún no';
            Swal.fire({
              title: '¡Oops!',
              text: 'Digita un opción que ' + str + ' exista y prueba de nuevo',
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
    }
    else {
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
    //console.log(this.gastosFijosForm.value); // Aquí llamaremos al servicio para enviar los datos al backend
    if (this.gastosFijosForm.valid) {
      const {
        necesidad,
        categoria,
        producto,
        cantidad,
        costoUnidad,
        periodicidad,
        fechaPago,
        metodoPago,
      } = this.gastosFijosForm.value;
      const necesario: boolean = necesidad == 'necesidad' ? true : false;
      const gasto: GastoFijo = {
        esNecesidad: necesario,
        categoria: categoria,
        producto: producto,
        cantidad: cantidad,
        costoPorUnidad: costoUnidad,
        periodo: periodicidad,
        fecha: fechaPago,
        metodoPago: metodoPago,
        monto: this.total,
      };
      this.gastosService
        .registrarGastoFijo(gasto)
        .subscribe((success: boolean) => {
          if (success) {
            Swal.fire({
              title: 'Todo listo!',
              text: 'Tu gasto se registró correctamente.',
              icon: 'success',
              confirmButtonText: 'OK',
            });
            this.gastosFijosForm.reset({
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
