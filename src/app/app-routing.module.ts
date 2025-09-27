import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PersonaComponent } from './modules/personas/persona/persona.component';
import { ClienteComponent } from './modules/clientes/cliente/cliente.component';
import { CuentaComponent } from './modules/cuentas/cuenta/cuenta.component';
import { MovimientoComponent } from './modules/movimientos/movimientos/movimiento.component';

const routes: Routes = [
    { path: 'personas', component: PersonaComponent },
    { path: 'clientes', component: ClienteComponent },
    { path: 'cuentas', component: CuentaComponent },
    { path: 'movimientos', component: MovimientoComponent },
    //{ path: 'reportes', component: ReporteComponent },
  { path: '', redirectTo: '/personas', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
