import { Calendario } from "./Calendario";
import { CategoriaUsuarios } from "./CategoriaUsuarios";

export interface CentroVacacional {
  id?: number;
  nombre: string;
  descripcion: string;
  calendarios: Array<Calendario>;
  categoriaUsuarios: Array<CategoriaUsuarios>;
  calendarioActivo: number;
}
