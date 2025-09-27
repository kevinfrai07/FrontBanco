import { Component } from '@angular/core';
import { APIENDPOINT } from '../../../config/configuration';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { debounceTime, Subject } from 'rxjs';
import { MovimientoModel } from '../../../shared/models/movimiento/Movimiento.model';
import { MovimientoService } from '../../../shared/services/movimiento/movimiento.service';

@Component({
  selector: 'app-movimiento',
  templateUrl: './movimiento.component.html',
  styleUrls: ['./movimiento.component.scss']
})
export class MovimientoComponent {
  movimientos: MovimientoModel[] = [];
  filteredMovimientos: MovimientoModel[] = [];

  movimiento: MovimientoModel = {} as MovimientoModel;

  searchMovimiento: string = '';
  private searchTerm$ = new Subject<string>();

  showPopup: boolean = false;

  constructor(
    private movimientoService: MovimientoService,
    private ngxService: NgxUiLoaderService,
    private messageService: MessageService
  ) {
    this.searchTerm$.pipe(debounceTime(300)).subscribe(() => {
      this.filterMovimientos();
    });
  }

  ngOnInit(): void {
    this.getMovimientos();
  }

  getMovimientos() {
    this.ngxService.start();
    this.movimientoService.get(APIENDPOINT.getMovimientos).subscribe({
      next: (data) => {
        this.ngxService.stop();
        if (data && data.responseData) {
          this.movimientos = data.responseData;
          this.filteredMovimientos = [...this.movimientos];
        }
      },
      error: (error) => {
        this.ngxService.stop();
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al obtener movimientos: ' + error
        });
      }
    });
  }

  onSearchTermChange() {
    this.searchTerm$.next(this.searchMovimiento.trim().toLowerCase());
  }

  filterMovimientos() {
    const searchTerm = this.searchMovimiento.toLowerCase();

    if (!searchTerm) {
      this.filteredMovimientos = [...this.movimientos];
      return;
    }

    this.filteredMovimientos = this.movimientos.filter(mov =>
      mov.numeroCuenta?.toLowerCase().includes(searchTerm) ||
      mov.tipoMovimiento?.toLowerCase().includes(searchTerm) ||
      mov.saldoInicial?.toString().includes(searchTerm) ||
      mov.estado?.toLowerCase().includes(searchTerm) ||
      mov.movimiento?.toLowerCase().includes(searchTerm)
    );
  }

  nuevo() {
    this.movimiento = {} as MovimientoModel;
    this.showPopup = true;
  }

  guardar() {
    this.ngxService.start();
    this.movimientoService.post(APIENDPOINT.addMovimientos, this.movimiento).subscribe({
      next: (res) => {
        this.ngxService.stop();
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Movimiento creado correctamente'
        });
        this.close();
        this.getMovimientos(); // refrescar lista
      },
      error: (error) => {
        this.ngxService.stop();
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al crear movimiento: ' + error
        });
      }
    });
  }

  close() {
    this.showPopup = false;
  }
}
