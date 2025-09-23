import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../models/response.model';
import { map, Observable } from 'rxjs';
import { environment } from '../../../enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<TModel, TMasterModel> {
	public headers: HttpHeaders | undefined;
	public responseModel: ResponseModel<any> = new ResponseModel<any>();

  constructor(protected _httpClient: HttpClient,
		protected _apiRoot: string = environment.apiURL
  ) { }

  private ApplicationAut(isAut: boolean) {
			let token = "";
			if (isAut) {
				this.headers = new HttpHeaders({
					'Access-Control-Allow-Origin': '*',
					//'Authorization': token
				});
			} else {
				this.headers = new HttpHeaders({
					'Access-Control-Allow-Origin': '*'
				});
			}
    }

  get(endPoint: string, isAut: boolean = false): Observable<ResponseModel<TModel>> {
    let fullPath = this._apiRoot + endPoint
    this.ApplicationAut(isAut);
			return this._httpClient.get(fullPath, { headers: this.headers })
			.pipe(map((resp:any) => {
				this.responseModel.mensaje = resp.mensaje;
				this.responseModel.respuesta = resp.respuesta;
				this.responseModel.status = resp.status;
				return this.responseModel;			
			}));		
		}

    post(endPoint: string, object: TModel, isAut: boolean = false): Observable<ResponseModel<TModel>> {
      let fullPath = this._apiRoot + endPoint
			this.ApplicationAut(isAut);
			return this._httpClient.post(fullPath, object, { headers: this.headers })
			.pipe(map((resp:any) => {
				this.responseModel.mensaje = resp.mensaje;
				this.responseModel.respuesta = resp.respuesta;
				this.responseModel.status = resp.status;
				this.responseModel.responseData = resp.data;
				return this.responseModel;			
			}));				
		}
}
