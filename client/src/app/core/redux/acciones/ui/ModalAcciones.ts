import { TiposAcciones, TiposAccionesModal } from './ModalTiposAcciones';
import { tiposModal } from '../../modelo/EstadoUI';

export function abrirModal( tipoModal: tiposModal ): TiposAccionesModal {
  return {
    type: TiposAcciones.ABRIR_MODAL,
    payload: tipoModal
  };
}

export function cerrarModal(): TiposAccionesModal {
  return {
    type: TiposAcciones.CERRAR_MODAL
  };
}
