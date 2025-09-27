import { Component } from '@angular/core';
import { ClienteModel } from '../../../shared/models/cliente/Cliente.model';
import { debounceTime, Subject } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { APIENDPOINT } from '../../../config/configuration';
import { ClienteService } from '../../../shared/services/cliente/cliente.service';
import { PersonaModel } from '../../../shared/models/persona/Persona.model';
import { PersonaService } from '../../../shared/services/persona/persona.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss'
})
export class ClienteComponent {
  cliente: ClienteModel = {} as ClienteModel;
  showPopup = false;
  isEditMode = false;
  searchCliente: string = '';
  clientes: ClienteModel[] = [];
  personas: PersonaModel[] = [];
  filteredClientes: ClienteModel[] = [];

  private searchTerm$ = new Subject<string>();

  constructor(
    private clienteService: ClienteService,
    private personaService: PersonaService,
    private ngxService: NgxUiLoaderService,
    private messageService: MessageService
  ) {
    this.searchTerm$.pipe(debounceTime(300)).subscribe(() => {
      this.filterCliente();
    });
  }

  ngOnInit(): void {
    this.getClientes();
    this.getPersonas(); 
  }

  getClientes() {
    this.ngxService.start();
    this.clienteService.get(APIENDPOINT.getClientes).subscribe({
      next: (data) => {
        this.ngxService.stop();
        if (data && data.responseData && data.responseData.length > 0) {
          this.clientes = data.responseData;
          this.filteredClientes = [...this.clientes];
        }
      },
      error: (error) => {
        this.ngxService.stop();
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al obtener clientes: ' + error
        });
      }
    });
  }

  nuevo() {
    this.cliente = {} as ClienteModel;
    this.isEditMode = false;
    this.showPopup = true;
  }

  editar(cliente: ClienteModel) {
    this.cliente = { ...cliente };
    this.isEditMode = true;
    this.showPopup = true;
  }

  close() {
    this.showPopup = false;
  }

  guardar() {
    this.ngxService.start();

    if (this.isEditMode) {
      const endpoint = `${APIENDPOINT.updatecliente}${this.cliente.clienteId}`;
      this.clienteService.put(endpoint, this.cliente).subscribe({
        next: () => {
          this.ngxService.stop();
          this.getClientes();
          this.showPopup = false;
          this.cliente = {} as ClienteModel;
          this.isEditMode = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Excelente!!',
            detail: 'Cliente Editado'
          });
        },
        error: (error) => {
          this.ngxService.stop();
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Error al editar cliente: ${error}`
          });
        }
      });
    } else {
      this.cliente.estado = "1"
      this.clienteService.post(APIENDPOINT.addcliente, this.cliente).subscribe({
        next: () => {
          this.ngxService.stop();
          this.getClientes();
          this.showPopup = false;
          this.cliente = {} as ClienteModel;
          this.messageService.add({
            severity: 'success',
            summary: 'Excelente!!',
            detail: 'Cliente Creado'
          });
        },
        error: (error) => {
          this.ngxService.stop();
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Error al crear cliente: ${error}`
          });
        }
      });
    }
  }

  filterCliente() {
    const searchTerm = this.searchCliente.toLowerCase();

    if (!searchTerm) {
      this.filteredClientes = [...this.clientes];
      return;
    }

    this.filteredClientes = this.clientes.filter(cliente =>
      cliente.clienteId?.toString().toLowerCase().includes(searchTerm) ||
      cliente.personaId?.toString().toLowerCase().includes(searchTerm) ||
      cliente.contrasenia?.toLowerCase().includes(searchTerm) ||
      cliente.estado?.toLowerCase().includes(searchTerm)
    );
  }

  onSearchTermChange() {
    this.searchTerm$.next(this.searchCliente.trim().toLowerCase());
    this.filterCliente();
  }

  getPersonas() {
    this.personaService.get(APIENDPOINT.getPersonas).subscribe({
      next: (data) => {
        if (data && data.responseData && data.responseData.length > 0) {
          this.personas = data.responseData;
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al obtener personas: ' + error
        });
      }
    });
  }
}
