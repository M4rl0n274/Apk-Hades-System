export interface Clientes {
  id?: number;
  nombre: string;
  apellido: string;
  edad: number;
  correo: string;
  documentoIdentidad: string;
  direccion: string;
  telefono: string;
  FechaDeNacimiento: string;
}

export interface RespuestaPaginada<T> {
  data: T[];
  meta: Meta;
}

export interface Meta {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  has_prev: boolean;
  has_next: boolean;
}
