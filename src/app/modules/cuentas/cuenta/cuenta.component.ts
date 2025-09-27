import { Component } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { APIENDPOINT } from '../../../config/configuration';
import { ClienteModel } from '../../../shared/models/cliente/Cliente.model';
import { ClienteService } from '../../../shared/services/cliente/cliente.service';
import { CuentaModel } from '../../../shared/models/cuenta/Cuenta.model';
import { CuentaService } from '../../../shared/services/cuenta/cuenta.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrl: './cuenta.component.scss'
})
export class CuentaComponent {
  cuenta: CuentaModel = {} as CuentaModel;
  showPopup = false;
  isEditMode = false;
  searchCuenta: string = '';
  cuentas: CuentaModel[] = [];
  clientes: ClienteModel[] = [];
  filteredCuentas: CuentaModel[] = [];

  private searchTerm$ = new Subject<string>();

  constructor(
    private cuentaService: CuentaService,
    private clienteService: ClienteService,
    private ngxService: NgxUiLoaderService,
    private messageService: MessageService
  ) {
    this.searchTerm$.pipe(debounceTime(300)).subscribe(() => {
      this.filterCuenta();
    });
  }

  ngOnInit(): void {
    this.getCuentas();
    this.getClientes();
  }

  getCuentas() {
    this.ngxService.start();
    this.cuentaService.get(APIENDPOINT.getCuenta).subscribe({
      next: (data) => {
        this.ngxService.stop();
        if (data && data.responseData && data.responseData.length > 0) {
          this.cuentas = data.responseData;
          this.filteredCuentas = [...this.cuentas];
        }
      },
      error: (error) => {
        this.ngxService.stop();
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al obtener cuentas: ' + error
        });
      }
    });
  }

  nuevo() {
    this.cuenta = {} as CuentaModel;
    this.isEditMode = false;
    this.showPopup = true;
  }

  editar(cuenta: CuentaModel) {
    this.cuenta = { ...cuenta };
    this.isEditMode = true;
    this.showPopup = true;
  }

  close() {
    this.showPopup = false;
  }

  guardar() {
    this.ngxService.start();

    if (this.isEditMode) {
      const endpoint = `${APIENDPOINT.updateCuenta}${this.cuenta.numeroCuenta}`;
      this.cuentaService.put(endpoint, this.cuenta).subscribe({
        next: () => {
          this.ngxService.stop();
          this.getCuentas();
          this.showPopup = false;
          this.cuenta = {} as CuentaModel;
          this.isEditMode = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Excelente!!',
            detail: 'Cuenta Editada'
          });
        },
        error: (error) => {
          this.ngxService.stop();
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Error al editar cuenta: ${error}`
          });
        }
      });
    } else {
      this.cuenta.estado = "1";
      this.cuentaService.post(APIENDPOINT.addCuenta, this.cuenta).subscribe({
        next: () => {
          this.ngxService.stop();
          this.getCuentas();
          this.showPopup = false;
          this.cuenta = {} as CuentaModel;
          this.messageService.add({
            severity: 'success',
            summary: 'Excelente!!',
            detail: 'Cuenta Creada'
          });
        },
        error: (error) => {
          this.ngxService.stop();
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Error al crear cuenta: ${error}`
          });
        }
      });
    }
  }

  filterCuenta() {
    const searchTerm = this.searchCuenta.toLowerCase();

    if (!searchTerm) {
      this.filteredCuentas = [...this.cuentas];
      return;
    }

    this.filteredCuentas = this.cuentas.filter(cuenta =>
      cuenta.numeroCuenta?.toString().toLowerCase().includes(searchTerm) ||
      cuenta.clienteId?.toString().toLowerCase().includes(searchTerm) ||
      cuenta.tipoCuenta?.toLowerCase().includes(searchTerm) ||
      cuenta.estado?.toLowerCase().includes(searchTerm)
    );
  }

  onSearchTermChange() {
    this.searchTerm$.next(this.searchCuenta.trim().toLowerCase());
    this.filterCuenta();
  }

  getClientes() {
    this.clienteService.get(APIENDPOINT.getClientes).subscribe({
      next: (data) => {
        if (data && data.responseData && data.responseData.length > 0) {
          this.clientes = data.responseData;
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al obtener clientes: ' + error
        });
      }
    });
  }
}
