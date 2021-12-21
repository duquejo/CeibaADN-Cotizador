import { tiposModal } from '../../modelo/EstadoUI';
import { TiposAccionesModal, TiposAcciones } from './ModalTiposAcciones';

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
