import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Importamos los módulos de formularios
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppComponent } from './app.component'; // Componente raíz
import { RegisterComponent } from './components/register/register.component';
import { GastosFijosFormComponent } from './components/gastos-fijos-form/gastos-fijos-form.component'; // Asegúrate de importar tus componentes aquí
import { LoginComponent } from './components/login/login.component';
import { routes } from './app.routes'; // Tus rutas definidas en app.routes.ts
import { GastosOcasionalesFormComponent } from './components/gastos-ocasionales-form/gastos-ocasionales-form.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { GastosListComponent } from './components/gastos-list/gastos-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GastosFijosFormComponent,
    GastosOcasionalesFormComponent,
    LoginComponent,
    EstadisticasComponent,
    RegisterComponent,
    GastosListComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
    SweetAlert2Module.forRoot(), //Alertas bonitas
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
