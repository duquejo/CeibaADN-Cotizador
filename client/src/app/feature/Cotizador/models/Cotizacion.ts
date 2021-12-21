import { CategoriaUsuarios } from 'app/feature/Admin/models/CategoriaUsuarios';
import { CentroVacacional } from '../../Admin/models/CentroVacacional';

export interface Cotizacion {
  id?: number;
  codigo?: string;
  centroVacacional: number | CentroVacacional;
  categoriaUsuarios: number | CategoriaUsuarios;
  fechaInicio: string;
  personas: number;
  fechaFin: string;
  total?: number;
}
