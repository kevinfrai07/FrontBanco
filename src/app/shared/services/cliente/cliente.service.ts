import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { MasterModel } from '../../models/master.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../enviroment/environment';
import { ClienteModel } from '../../models/cliente/Cliente.model';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class ClienteService  extends BaseService<ClienteModel, MasterModel> {
    constructor(protected _http: HttpClient) {
        super(_http, environment.apiURL);
    }
    
}
