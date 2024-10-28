import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { GastosFijosFormComponent } from './components/gastos-fijos-form/gastos-fijos-form.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { AutenticacionGuard } from './guards/autenticacion.guard';
import { GastosOcasionalesFormComponent } from './components/gastos-ocasionales-form/gastos-ocasionales-form.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { GastosListComponent } from './components/gastos-list/gastos-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },  // Página de inicio es el login
  { path: 'home', component: HomeComponent, canActivate: [AutenticacionGuard] },  // Página de inicio después del login
  { path: 'register', component: RegisterComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'gastos-fijos', component: GastosFijosFormComponent, canActivate: [AutenticacionGuard] },
  { path: 'gastos-ocasionales', component: GastosOcasionalesFormComponent, canActivate: [AutenticacionGuard] },
  { path: 'estadisticas', component: EstadisticasComponent, canActivate: [AutenticacionGuard] },
  { path: 'gastos-list', component: GastosListComponent, canActivate: [AutenticacionGuard] },
  { path: '**', redirectTo: '' }
];
