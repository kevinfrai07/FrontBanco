import { HeaderResponseModel } from "./header-response.model";

export class ResponseModel<T> {
    public mensaje?: string;
    public respuesta: any;
    public status?: number;
    public responseData?: T[];
}
