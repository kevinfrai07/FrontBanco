export interface ConjuntoModel {
  cant_apto_piso: number;
  cant_piso_torre: number;
  cant_torres: number;
  celular: string | null; // puede ser "undefined" como string o null si lo manejas diferente
  correo: string;
  direccion: string;
  id_conjunto: number;
  imagen: string | null;
  nit: string;
  nombre_conjunto: string;
}