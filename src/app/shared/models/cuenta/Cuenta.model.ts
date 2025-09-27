import { ClienteModel } from "../cliente/Cliente.model";
import { PersonaModel } from "../persona/Persona.model";

export interface CuentaModel {
  numeroCuenta: string;
  clienteId: 0;
  tipoCuenta: string;
  saldoInicial: number;
  estado: string;
  cliente: ClienteModel
}