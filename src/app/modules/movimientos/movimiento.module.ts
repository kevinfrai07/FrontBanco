import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { MovimientoComponent } from './movimientos/movimiento.component';
import { MovimientoRoutingModule } from './movimiento-routing.module';
@NgModule({
  declarations: [
    MovimientoComponent,
  ],
  imports: [
    CommonModule,
    MovimientoRoutingModule,
    SharedModule
  ],
  providers: [
  ]
})
export class MovimientoModule { }