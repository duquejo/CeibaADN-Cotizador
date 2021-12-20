import { TiposAccionesModal, TiposAcciones } from '../../acciones/ui/ModalTiposAcciones';

const initialState: any = {
  modalOpen: Boolean(),
  type: false
};

export default function ( state = initialState, action: TiposAccionesModal ): any {
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
