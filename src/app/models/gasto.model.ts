// src/app/models/gasto.model.ts

export interface GastoOcasional {
  esNecesidad: boolean; // Si es una necesidad (true) o deseo (false)
  categoria: string; // Categoría del gasto (e.g., "comida", etc.)
  producto: string; // El producto o servicio (e.g., "chocorramo", etc.)
  cantidad: number; // Cantidad de productos
  costoPorUnidad: number; // Precio por unidad del producto o servicio
  fecha: Date; // Fecha de pago
  metodoPago: string; // Método de pago
  monto: number; // Total calculado como (cantidad * costo por unidad)
}

export interface GastoFijo extends GastoOcasional {
  periodo: string; // Periodicidad del gasto (diario, mensual, anual, etc.)
}
