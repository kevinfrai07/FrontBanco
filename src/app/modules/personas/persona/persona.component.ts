import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { PersonaService } from '../../../shared/services/persona/persona.service';
import { APIENDPOINT } from '../../../config/configuration';
import { CreatePersonaModel } from '../../../shared/models/persona/CreatePersona.model';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.scss'] 
})
export class PersonaComponent implements OnInit {
  persona: CreatePersonaModel = {} as CreatePersonaModel
  showPopup = false
  searchPersona: string = ''
  personas: CreatePersonaModel[] = [];
  filteredPersonas: CreatePersonaModel[] = [];
  
  // opcional: lista para renderizar con *ngFor
  opcionesGenero = [
    { value: 'M', label: 'Masculino' },
    { value: 'F', label: 'Femenino' },
    { value: 'O', label: 'Otro' }
  ];
  private searchTerm$ = new Subject<string>();
  constructor(
    private personaService: PersonaService,
    private ngxService: NgxUiLoaderService,
    private messageService: MessageService,
  ) {
    this.searchTerm$.pipe(debounceTime(300)).subscribe((term) => {
      this.filterPersona();
    });
  }
  
  
  
  ngOnInit(): void {
    this.getPersonas()
  }
  
  getPersonas(){
    this.ngxService.start()
    this.personaService.get(APIENDPOINT.getPersonas).subscribe({
      next:(data)=>{
        this.ngxService.stop();
        if (data && data.responseData && data.responseData.length > 0) {
          this.personas = data.responseData;
          this.filteredPersonas = [...this.personas];
        }
      },
      error: (error) =>{
        this.ngxService.stop();
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al obtener personas: ' + error
        });
      }
    })
  }
  
  nuevo(){
    this.showPopup = true
  }
  
  close(){
    this.showPopup = false
  }
  
  guardar(){
    this.personaService.post(APIENDPOINT.addpersona, this.persona).subscribe({
      next: (response) => {
        this.ngxService.stop()
        this.getPersonas()
        this.showPopup=false
        this.persona = {} as CreatePersonaModel;
        this.messageService.add({
          severity: 'success',
          summary: 'Excelente!!',
          detail: `Persona Creada`
        })
      },
      error: (error) => {
        this.ngxService.stop()
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Error no manejado: ${error}`
        })
      }
    });
  }
  filterPersona(){
    const searchTerm = this.searchPersona.toLowerCase();
    
    if (!searchTerm) {
      this.filteredPersonas = [...this.personas];
      return;
    }
    
    this.filteredPersonas = this.personas.filter(persona =>
      persona.personaId?.toString().toLowerCase().includes(searchTerm) ||
      persona.nombre?.toLowerCase().includes(searchTerm) ||
      persona.genero?.toLowerCase().includes(searchTerm) ||
      persona.edad?.toString().toLowerCase().includes(searchTerm) ||
      persona.identificacion?.toLowerCase().includes(searchTerm) ||
      persona.telefono?.toLowerCase().includes(searchTerm)
    );
  
  // Aplicar paginación
  //const start = (this.page - 1) * this.pageSize;
  //this.filteredPersonas = filteredResults.slice(start, start + this.pageSize);
}

onSearchTermChange(){
  this.searchTerm$.next(this.searchPersona.trim().toLowerCase());
  this.filterPersona();
}
}
