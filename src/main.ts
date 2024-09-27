import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';  // Asegúrate de importar las rutas
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(FormsModule),  // Proveemos FormsModule desde aquí
    provideRouter(routes)  // Aquí pasamos las rutas correctas
  ]
}).catch(err => console.error(err));
