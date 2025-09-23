import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonaComponent } from './persona/persona.component';
import { PersonaRoutingModule } from './personas-routing.module';
import { PersonaService } from '../../shared/services/persona/persona.service';
@NgModule({
  declarations: [
    PersonaComponent,
  ],
  imports: [
    CommonModule,
    PersonaRoutingModule,
    //ShareModules
  ],
  providers: [
    PersonaService,
  ]
})
export class PersonaModule { }