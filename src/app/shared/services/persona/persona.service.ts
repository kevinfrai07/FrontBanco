import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { MasterModel } from '../../models/master.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../enviroment/environment';
import { CreatePersonaModel } from '../../models/persona/CreatePersona.model';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class PersonaService  extends BaseService<CreatePersonaModel, MasterModel> {
    constructor(protected _http: HttpClient) {
        super(_http, environment.apiURL);
    }
    
}
