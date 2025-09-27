import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { CuentaRoutingModule } from './cuenta-routing.module';
import { CuentaComponent } from './cuenta/cuenta.component';
@NgModule({
  declarations: [
    CuentaComponent,
  ],
  imports: [
    CommonModule,
    CuentaRoutingModule,
    SharedModule
  ],
  providers: [
  ]
})
export class CuentaModule { }