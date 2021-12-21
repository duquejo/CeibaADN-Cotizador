import { tiposModal } from '../../modelo/EstadoUI';

export enum TiposAcciones {
  ABRIR_MODAL = 'ABRIR_MODAL',
  CERRAR_MODAL = 'CERRAR_MODAL',
};

interface AccionAbrirModal {
  type: typeof TiposAcciones.ABRIR_MODAL;
  payload: tiposModal;
}

interface AccionCerrarModal {
  type: typeof TiposAcciones.CERRAR_MODAL;
}

export type TiposAccionesModal = | AccionAbrirModal | AccionCerrarModal;