import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { MasterModel } from '../../models/master.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../enviroment/environment';
import { CuentaModel } from '../../models/cuenta/Cuenta.model';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class CuentaService  extends BaseService<CuentaModel, MasterModel> {
    constructor(protected _http: HttpClient) {
        super(_http, environment.apiURL);
    }
    
}
