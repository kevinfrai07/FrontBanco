import { Component } from '@angular/core';
type ModuleKey = 'personas' | 'clientes' | 'cuentas' | 'movimientos';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  selected: ModuleKey = 'personas';
  
  
  get title(){
    switch(this.selected){
      case 'personas': return 'Personas';
      case 'clientes': return 'Clientes';
      case 'cuentas': return 'Cuentas';
      case 'movimientos': return 'Movimientos';
      default: return '';
    }
  }
  
  
  select(key: ModuleKey){ this.selected = key }
}
