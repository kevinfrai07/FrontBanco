import { PersonaModel } from "../persona/Persona.model";

export interface ClienteModel {
  clienteId: 0;
  personaId: 0;
  contrasenia: string;
  estado: string;
  persona: PersonaModel;
}