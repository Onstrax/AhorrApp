// src/app/models/gasto.model.ts

export interface Gasto {
     esNecesidad: boolean;  // Si es una necesidad (true) o deseo (false)
     categoria: string;     // Categoría del gasto (e.g., "alquiler", "comida", etc.)
     producto: string;      // El producto o servicio
     cantidad: number;      // Cantidad de productos
     costoPorUnidad: number; // Precio por unidad del producto o servicio
     fechaPago: Date;       // Fecha de pago
     metodoPago: string;    // Método de pago (e.g., "tarjeta de crédito")
     total: number;         // Total calculado como cantidad * costo por unidad
   }
   
   export interface GastoFijo extends Gasto {
     periodicidad: string;  // Periodicidad del gasto (diario, mensual, anual, etc.)
   }
   
   export interface GastoOcasional extends Gasto {
     // No se necesita periodicidad, por lo que este es igual que Gasto
   }
   