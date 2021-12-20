import { Calendario } from 'app/feature/Admin/models/Calendario';

export enum TiposAcciones {
  LISTAR_CALENDARIO = 'LISTAR_CALENDARIO',
  AGREGAR_CALENDARIO = 'AGREGAR_CALENDARIO',
  ACTUALIZAR_CALENDARIO = 'ACTUALIZAR_CALENDARIO',
  ELIMINAR_CALENDARIO = 'ELIMINAR_CALENDARIO',
  ACTIVAR_CALENDARIO_EDICION = 'ACTIVAR_CALENDARIO_EDICION', 
  DESACTIVAR_CALENDARIO_EDICION = 'DESACTIVAR_CALENDARIO_EDICION', 
};

interface AccionListarCalendarios {
  type: typeof TiposAcciones.LISTAR_CALENDARIO;
  payload: Calendario[];
}

interface AccionAgregarCalendario {
  type: typeof TiposAcciones.AGREGAR_CALENDARIO;
  payload: Calendario;
}

interface AccionActualizarCalendario {
  type: typeof TiposAcciones.ACTUALIZAR_CALENDARIO;
  payload: Calendario;
}

interface AccionEliminarCalendario {
  type: typeof TiposAcciones.ELIMINAR_CALENDARIO;
  payload: Calendario;
}

interface AccionActivarCalendarioEdicion {
  type: typeof TiposAcciones.ACTIVAR_CALENDARIO_EDICION;
  payload: Calendario;
}

interface AccionDesactivarCalendarioEdicion {
  type: typeof TiposAcciones.DESACTIVAR_CALENDARIO_EDICION;
}

export type TiposAccionesCalendario = 
  | AccionListarCalendarios 
  | AccionAgregarCalendario 
  | AccionActualizarCalendario 
  | AccionEliminarCalendario
  | AccionActivarCalendarioEdicion
  | AccionDesactivarCalendarioEdicion;
