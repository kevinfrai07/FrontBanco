import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { MasterModel } from '../../models/master.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../enviroment/environment';
import { MovimientoModel } from '../../models/movimiento/Movimiento.model';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class MovimientoService  extends BaseService<MovimientoModel, MasterModel> {
    constructor(protected _http: HttpClient) {
        super(_http, environment.apiURL);
    }
    
}
