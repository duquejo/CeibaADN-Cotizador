import { EstadoCalendario } from './EstadoCalendario';
import { EstadoCategoriaUsuarios } from './EstadoCategoriaUsuarios';
import { EstadoCentroVacacional } from './EstadoCentroVacacional';
import { EstadoUI } from './EstadoUI';

export interface EstadoGeneral {
  calendarios: EstadoCalendario;
  categoriasUsuarios: EstadoCategoriaUsuarios;
  centrosVacacionales: EstadoCentroVacacional;
  ui: EstadoUI;
}
