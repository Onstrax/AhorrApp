// src/app/services/gastos.service.ts

import { Injectable } from '@angular/core';
import { GastoFijo, GastoOcasional } from '../models/gasto.model';

@Injectable({
  providedIn: 'root'
})
export class GastosService {
  private gastosFijos: GastoFijo[] = [];
  private gastosOcasionales: GastoOcasional[] = [];

  registrarGastoFijo(gasto: GastoFijo) {
    this.gastosFijos.push(gasto);
  }

  registrarGastoOcasional(gasto: GastoOcasional) {
    this.gastosOcasionales.push(gasto);
  }

  obtenerGastosFijos(): GastoFijo[] {
    return this.gastosFijos;
  }

  obtenerGastosOcasionales(): GastoOcasional[] {
    return this.gastosOcasionales;
  }
}
