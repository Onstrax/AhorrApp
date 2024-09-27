import { Component } from '@angular/core';
import { GastosService } from '../../services/gastos.service';
import { GastoFijo } from '../../models/gasto.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gastos-fijos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gastos-fijos.component.html',
  styleUrl: './gastos-fijos.component.css'
})
export class GastosFijosComponent {
  categorias: string[] = ['Alquiler', 'Hogar', 'Luz', 'Agua', 'Comida', 'Ropa', 'Salud', 'Educación'];
  metodosPago: string[] = ['Tarjeta de crédito', 'Débito', 'Nequi', 'Daviplata', 'Efectivo'];

  gastoFijo: GastoFijo = {
    esNecesidad: false,
    categoria: '',
    producto: '',
    cantidad: 0,
    costoPorUnidad: 0,
    fechaPago: new Date(),
    metodoPago: '',
    total: 0,
    periodicidad: 'mensual'
  };

  constructor(private gastosService: GastosService) {}

  submitGastoFijo() {
    this.gastoFijo.total = this.gastoFijo.cantidad * this.gastoFijo.costoPorUnidad;
    this.gastosService.registrarGastoFijo(this.gastoFijo);
  }
}
