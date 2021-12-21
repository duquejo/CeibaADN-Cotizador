import { TiposAccionesModal, TiposAcciones } from '../../acciones/ui/ModalTiposAcciones';
import { EstadoUI } from '../../modelo/EstadoUI';

const initialState: EstadoUI = {
  modalOpen: Boolean(),
  type: false
};

export default function ( state = initialState, action: TiposAccionesModal ): EstadoUI {
  switch ( action.type ) {

    case TiposAcciones.ABRIR_MODAL: {
      return {
        ...state,
        modalOpen: true,
        type: action.payload
      };
    }

    case TiposAcciones.CERRAR_MODAL: {
      return {
        ...state,
        modalOpen: false,
        type: false
      };
    }

    default:
      return state;
  }
}
