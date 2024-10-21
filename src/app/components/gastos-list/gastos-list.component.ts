import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GastosService } from '../../services/gastos.service';
import { GastoFijo, GastoOcasional } from '../../models/gasto.model';
import { AutenticacionService } from '../../services/autenticacion.service';

@Component({
  selector: 'app-gastos-list',
  templateUrl: './gastos-list.component.html',
  styleUrl: './gastos-list.component.css'
})
export class GastosListComponent implements OnInit {
  gastosFijos: GastoFijo[] = [];
  gastosOcasionales: GastoOcasional[] = [];
  seleccionadosFijos: Set<number> = new Set<number>();
  seleccionadosOcasionales: Set<number> = new Set<number>();
  checkboxFijos: boolean[] = [];
  checkboxOcasionales: boolean[] = [];
  acumulado: number = 0;

  constructor(
    private router: Router,
    private gastosService: GastosService,
  ) {this.checkboxFijos = new Array(this.gastosFijos.length).fill(false);
    this.checkboxOcasionales = new Array(this.gastosOcasionales.length).fill(false);}

  volver(): void {
    this.router.navigate(['/home']);
  }

  toggleSeleccionado(tabla: string, index: number): void {
    if (tabla === 'fijos') {
      if (this.seleccionadosFijos.has(index)) {
        this.seleccionadosFijos.delete(index);
        this.checkboxFijos[index] = false;
      } else {
        this.seleccionadosFijos.add(index);
        this.checkboxFijos[index] = true;
      }
    } else if (tabla === 'ocasionales') {
      if (this.seleccionadosOcasionales.has(index)) {
        this.seleccionadosOcasionales.delete(index);
        this.checkboxOcasionales[index] = false;
      } else {
        this.seleccionadosOcasionales.add(index);
        this.checkboxOcasionales[index] = true;
      }
    }
  }

  actualizarAcumulado(): void {
    this.acumulado = 0;

    this.seleccionadosFijos.forEach(index => {
      this.acumulado += this.gastosFijos[index].monto;
    });

    this.seleccionadosOcasionales.forEach(index => {
      this.acumulado += this.gastosOcasionales[index].monto;
    });
  }

  ngOnInit(): void {
    this.cargarGastos();
  }

  cargarGastos(): void {
    this.gastosService.obtenerGastosList().subscribe(
      (respuesta) => {
      this.gastosFijos = respuesta.fijos;
      //console.log(respuesta.fijos)
      this.gastosOcasionales = respuesta.ocasionales;
    },
    (error) => {
      Swal.fire({
        title: '!Oops!',
        text: 'Algo salió mal. Inténtalo de nuevo en un minuto.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      console.error('Error al obtener los gastos', error);
    })
  }

  eliminarGasto(gasto: GastoOcasional, tabla: string): void {
    this.gastosService.deleteGasto(gasto, tabla).subscribe(() => {
      // Una vez eliminado en el backend, actualiza la lista localmente
      if (tabla === 'fijos') {
        this.gastosFijos = this.gastosFijos.filter(g => g !== gasto);
        this.checkboxFijos = this.checkboxFijos.slice(0, this.gastosFijos.length);
      } else if (tabla === 'ocasionales') {
        this.gastosOcasionales = this.gastosOcasionales.filter(g => g !== gasto);
        this.checkboxOcasionales = this.checkboxOcasionales.slice(0, this.gastosOcasionales.length);
      }
      Swal.fire({
        title: '!Hecho!',
        text: 'Gasto eliminado.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      this.actualizarAcumulado();
    });
  }
  
}
