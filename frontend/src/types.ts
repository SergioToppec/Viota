export interface Acuerdo {
  descripcion: string;
  responsable: string;
  fecha: string;
}

export interface MinutaResponse {
  resumen: string;
  participantes: string[];
  temas: string[];
  acuerdos: Acuerdo[];
}

export type MinutaDisplayFormat = MinutaResponse | string;