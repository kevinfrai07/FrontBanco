import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './shared/commons/CustomReuseStrategy ';
import { ClienteComponent } from './modules/clientes/cliente/cliente.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PersonaModule } from './modules/personas/personas.module';
import { ClienteModule } from './modules/clientes/cliente.module';
import { CuentaModule } from './modules/cuentas/cuenta.module';
import { MovimientoModule } from './modules/movimientos/movimiento.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxUiLoaderModule,
    ToastModule,
    BrowserAnimationsModule,
    PersonaModule,
    ClienteModule,
    CuentaModule,
    MovimientoModule
  ],
  providers: [
  { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
  MessageService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
