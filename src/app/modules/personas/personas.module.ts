import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonaComponent } from './persona/persona.component';
import { PersonaRoutingModule } from './personas-routing.module';
import { SharedModule } from '../../shared/shared.module';
@NgModule({
  declarations: [
    PersonaComponent,
  ],
  imports: [
    CommonModule,
    PersonaRoutingModule,
    SharedModule
  ],
  providers: [
  ]
})
export class PersonaModule { }