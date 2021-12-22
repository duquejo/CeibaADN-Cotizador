import { CentroVacacional } from 'app/feature/Admin/models/CentroVacacional';

export enum TiposAcciones {
  LISTAR_CENTRO_VACACIONAL = 'LISTAR_CENTRO_VACACIONAL',
  AGREGAR_CENTRO_VACACIONAL = 'AGREGAR_CENTRO_VACACIONAL',
  ACTUALIZAR_CENTRO_VACACIONAL = 'ACTUALIZAR_CENTRO_VACACIONAL',
  ELIMINAR_CENTRO_VACACIONAL = 'ELIMINAR_CENTRO_VACACIONAL',
  ACTIVAR_CENTRO_VACACIONAL_EDICION = 'ACTIVAR_CENTRO_VACACIONAL_EDICION', 
  DESACTIVAR_CENTRO_VACACIONAL_EDICION = 'DESACTIVAR_CENTRO_VACACIONAL_EDICION', 
}

interface AccionListarCentroVacacionales {
  type: typeof TiposAcciones.LISTAR_CENTRO_VACACIONAL;
  payload: CentroVacacional[];
}

interface AccionAgregarCentroVacacional {
  type: typeof TiposAcciones.AGREGAR_CENTRO_VACACIONAL;
  payload: CentroVacacional;
}

interface AccionActualizarCentroVacacional {
  type: typeof TiposAcciones.ACTUALIZAR_CENTRO_VACACIONAL;
  payload: CentroVacacional;
}

interface AccionEliminarCentroVacacional {
  type: typeof TiposAcciones.ELIMINAR_CENTRO_VACACIONAL;
  payload: CentroVacacional;
}

interface AccionActivarCentroVacacionalEdicion {
  type: typeof TiposAcciones.ACTIVAR_CENTRO_VACACIONAL_EDICION;
  payload: CentroVacacional;
}

interface AccionDesactivarCentroVacacionalEdicion {
  type: typeof TiposAcciones.DESACTIVAR_CENTRO_VACACIONAL_EDICION;
}

export type TiposAccionesCentroVacacional = 
  | AccionListarCentroVacacionales
  | AccionAgregarCentroVacacional 
  | AccionActualizarCentroVacacional 
  | AccionEliminarCentroVacacional
  | AccionActivarCentroVacacionalEdicion
  | AccionDesactivarCentroVacacionalEdicion;
