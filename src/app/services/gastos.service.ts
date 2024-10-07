import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { apiUrl } from '../urls/apiurl';
import { GastoFijo, GastoOcasional } from '../models/gasto.model';

@Injectable({
  providedIn: 'root',
})
export class GastosService {
  constructor(private http: HttpClient) {}

  registrarGastoOcasional(gasto: GastoOcasional): Observable<boolean> {
    return this.http.post<boolean>(`${apiUrl}/gastos/ocasionales`, {
      username: localStorage.getItem('user'),
      esNecesidad: gasto.esNecesidad,
      categoria: gasto.categoria,
      producto: gasto.producto,
      fecha: gasto.fecha,
      metodoPago: gasto.metodoPago,
      monto: gasto.monto,
    });
  }

  registrarGastoFijo(gasto: GastoFijo): Observable<boolean> {
    return this.http.post<boolean>(`${apiUrl}/gastos/fijos`, {
      username: localStorage.getItem('user'),
      esNecesidad: gasto.esNecesidad,
      categoria: gasto.categoria,
      producto: gasto.producto,
      periodo: gasto.periodo,
      fecha: gasto.fecha,
      metodoPago: gasto.metodoPago,
      monto: gasto.monto,
    });
  }

  obtenerGastos(
    username: string,
    desde: string,
    hasta: string
  ): Observable<{ gastos: GastoOcasional[], total: number }> {
    const params = new HttpParams()
      .set('username', username)
      .set('desde', desde)
      .set('hasta', hasta);
    return this.http.get<{ gastos: GastoOcasional[], total: number }>(`${apiUrl}/gastos`, { params });
  }

  obtenerGastosList(): Observable<{ fijos: GastoFijo[], ocasionales: GastoOcasional[] }> {
    const params = new HttpParams()
      .set('username', localStorage.getItem('user')!);
    return this.http.get<{ fijos: GastoFijo[], ocasionales: GastoOcasional[] }>(`${apiUrl}/gastos-list`, { params });
  }

  obtenerPreferencias(preferencia: string): Observable<string[]> {
    const params = new HttpParams()
      .set('username', localStorage.getItem('user')!)
      .set('preferencia', preferencia);
    return this.http.get<string[]>(`${apiUrl}/${preferencia}`, { params });
  }

  deleteGasto(gasto: GastoOcasional, tabla: string): Observable<void> {
    // Envía el objeto gasto junto con la tabla al backend
    return this.http.request<void>('delete', `${apiUrl}/gastos-list`, {
      body: { gasto, tabla }  // Envía el gasto y la tabla en el cuerpo de la solicitud
    });
  }
  
  

  modificarPreferencia(
    accion: string,
    preferencia: string,
    valor: string
  ): Observable<string> {
    let proper: string = valor.toLowerCase();
    proper = proper.charAt(0).toUpperCase() + proper.substring(1);
    console.log(proper)
    const params = new HttpParams()
      .set('username', localStorage.getItem('user')!)
      .set('preferencia', preferencia)
      .set('valor', proper);
    if (accion == 'add') {
      return this.http.put<string>(
        `${apiUrl}/agregar_preferencia`,
        {},
        { params }
      );
    } else if (accion == 'delete') {
      return this.http.put<string>(
        `${apiUrl}/eliminar_preferencia`,
        {},
        { params }
      );
    } else {
      return of('error');
    } //ni idea
  }
}
