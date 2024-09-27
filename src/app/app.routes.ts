import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { GastosFijosComponent } from './componentes/gastos-fijos/gastos-fijos.component';
import { AutenticacionGuard } from './guards/autenticacion.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'gastos', component: GastosFijosComponent, canActivate: [AutenticacionGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
