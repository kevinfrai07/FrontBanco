import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { MasterModel } from '../../models/master.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../enviroment/environment';
import { PersonaModel } from '../../models/persona/CarteleraModel.model';


@Injectable()
export class PersonaService  extends BaseService<PersonaModel, MasterModel> {
    constructor(protected _http: HttpClient) {
        super(_http, environment.apiURL);
    }
    
}
