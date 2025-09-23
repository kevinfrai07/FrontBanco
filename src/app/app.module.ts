import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './shared/commons/CustomReuseStrategy ';
import { ClienteComponent } from './modules/clientes/cliente/cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
  { provide: RouteReuseStrategy, useClass: CustomReuseStrategy }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
