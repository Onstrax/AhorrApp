import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Chart, registerables, TooltipItem } from 'chart.js';
import { apiUrl } from '../../urls/apiurl';
import { GastosService } from '../../services/gastos.service';
import { GastoOcasional } from '../../models/gasto.model';
import { CurrencyPipe, formatCurrency } from '@angular/common';

@Component({
  selector: 'app-visualizacion',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css'],
})
export class EstadisticasComponent implements AfterViewInit {
  periodoSeleccionado = '30'; // Valor inicial para el periodo
  fechaDesde: string = '';
  fechaHasta: string = '';
  gastos: GastoOcasional[] = []; // Aquí se almacenarán los gastos obtenidos del backend
  chartTipo: any;
  chartCategoria: any;
  chartMetodoPago: any;
  total: number = 0;

  constructor(
    private router: Router,
    private http: HttpClient,
    private gastosService: GastosService
  ) {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.actualizarVisualizacion(); // Llamamos para obtener los datos al inicio
  }

  volver(): void {
    this.router.navigate(['/home']);
  }

  getDesde(periodo: string): string {
    const dias = parseInt(periodo);
    const hoy = new Date();
  
    // Restar los días correspondientes
    hoy.setDate(hoy.getDate() - dias);
  
    // Construir el string en formato aaaa-mm-dd
    const year = hoy.getFullYear();
    const month = (hoy.getMonth() + 1).toString().padStart(2, '0');
    const day = hoy.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  actualizarVisualizacion(): void {
    if (this.periodoSeleccionado !== 'personalizado') {
      //console.log(this.getDesde(this.periodoSeleccionado), new Date().toISOString().split('T')[0]);
      // Resetear las fechas si no es personalizado
      this.fechaDesde = '';
      this.fechaHasta = '';
      this.gastosService
        .obtenerGastos(localStorage.getItem('user')!, this.getDesde(this.periodoSeleccionado), new Date().toISOString().split('T')[0])
        .subscribe(
          (respuesta) => {
            this.gastos = respuesta.gastos;
            this.total = respuesta.total;
            //console.log(this.gastos);
            this.generarGraficas();
          },
          (error) => {
            console.error('Error al obtener los gastos', error);
          }
        );
    }
    else {
      if (this.fechaHasta == ""){this.fechaHasta = new Date().toISOString().split('T')[0]}
      console.log(" a ", this.fechaDesde," xd ", this.fechaHasta)
      this.gastosService
        .obtenerGastos(localStorage.getItem('user')!, this.fechaDesde, this.fechaHasta)
        .subscribe(
          (respuesta) => {
            this.gastos = respuesta.gastos; //AQUI TOTAL
            this.total = respuesta.total;
            //console.log(this.gastos);
            this.generarGraficas();
          },
          (error) => {
            console.error('Error al obtener los gastos', error);
          }
        );
    }

    // this.http.get<any[]>(`${apiUrl}/gastos?periodo=${this.periodoSeleccionado}`).subscribe(data => {
    //   this.gastos = data;
    // });
  }

  generarGraficas(): void {
    // Datos procesados para cada gráfica
    const datosTipo = this.agruparPor(this.gastos, 'esNecesidad');
    const datosCategoria = this.agruparPor(this.gastos, 'categoria');
    const datosMetodoPago = this.agruparPor(this.gastos, 'metodoPago');

    // Generar gráfica por tipo de gasto
    const ctxTipo = document.getElementById('graficoTipo') as HTMLCanvasElement;
    if (ctxTipo) {
      if (this.chartTipo) this.chartTipo.destroy(); // Destruye el gráfico si ya existe
      this.chartTipo = new Chart(ctxTipo, {
        type: 'doughnut',
        data: {
          labels: Object.keys(datosTipo),
          datasets: [
            {
              data: Object.values(datosTipo),
              backgroundColor: ['#FF6384', '#36A2EB'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB'],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: (tooltipItem: any) => {
                  const dataIndex = tooltipItem.dataIndex; 
                  const monto = Object.values(datosTipo)[dataIndex]; // Accede al monto basado en el índice
                  const montoFormateado = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(monto);
                  // Ahora, monto es un número y se puede usar en la operación aritmética
                  const porcentaje = ((monto / this.total) * 100).toFixed(2);
    
                  return `Monto: ${montoFormateado} COP (${porcentaje}%)`;
                }
              }
            },
            legend: {
              display: true,
              position: 'top',
            }
          }
        },
      });
    }

    // Generar gráfica por categoría
    const ctxCategoria = document.getElementById(
      'graficoCategoria'
    ) as HTMLCanvasElement;
    if (ctxCategoria) {
      if (this.chartCategoria) this.chartCategoria.destroy(); // Destruye el gráfico si ya existe
      this.chartCategoria = new Chart(ctxCategoria, {
        type: 'doughnut',
        data: {
          labels: Object.keys(datosCategoria),
          datasets: [
            {
              data: Object.values(datosCategoria),
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: (tooltipItem: any) => {
                  const dataIndex = tooltipItem.dataIndex; 
                  const monto = Object.values(datosCategoria)[dataIndex]; // Accede al monto basado en el índice
                  const montoFormateado = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(monto);
                  // Ahora, monto es un número y se puede usar en la operación aritmética
                  const porcentaje = ((monto / this.total) * 100).toFixed(2);
    
                  return `Monto: ${montoFormateado} COP (${porcentaje}%)`;
                }
              }
            },
            legend: {
              display: true,
              position: 'top',
            }
          }
        },
      });
    }

    // Generar gráfica por método de pago
    const ctxMetodoPago = document.getElementById(
      'graficoMetodoPago'
    ) as HTMLCanvasElement;
    if (ctxMetodoPago) {
      if (this.chartMetodoPago) this.chartMetodoPago.destroy(); // Destruye el gráfico si ya existe
      this.chartMetodoPago = new Chart(ctxMetodoPago, {
        type: 'doughnut',
        data: {
          labels: Object.keys(datosMetodoPago),
          datasets: [
            {
              data: Object.values(datosMetodoPago),
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            tooltip: {
              callbacks: {
                label: (tooltipItem: any) => {
                  const dataIndex = tooltipItem.dataIndex; 
                  const monto = Object.values(datosMetodoPago)[dataIndex]; // Accede al monto basado en el índice
                  const montoFormateado = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(monto);
                  // Ahora, monto es un número y se puede usar en la operación aritmética
                  const porcentaje = ((monto / this.total) * 100).toFixed(2);
    
                  return `Monto: ${montoFormateado} COP (${porcentaje}%)`;
                }
              }
            },
            legend: {
              display: true,
              position: 'top',
            }
          }
        },
      });
    }
  }

  agruparPor(
    gastos: GastoOcasional[],
    clave: keyof GastoOcasional
  ): { [key: string]: number } {
    return gastos.reduce(
      (acc: { [key: string]: number }, gasto: GastoOcasional) => {
        let key = String(gasto[clave]); // Convertir el valor de la clave a string
        if (clave === 'esNecesidad') {
          key = String(gasto.esNecesidad) === 'TRUE' ? 'Necesidad' : 'Deseo';
        }
        if (!acc[key]) {
          acc[key] = 0;
        }
        acc[key] += gasto.monto; // Sumar el monto al grupo correspondiente
        return acc;
      },
      {}
    );
  }

}
