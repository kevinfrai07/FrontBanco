export interface PersonaModel {
  personaId: number;        // PK
  nombre: string;           // obligatorio
  genero?: string;          // opcional
  edad?: number;            // opcional
  identificacion: string;   // único, obligatorio
  direccion?: string;       // opcional
  telefono?: string;        // opcional
}