import {
  listarCentrosVacacionalesAsync,
  guardarNuevoCentroVacacionalAsync,
  actualizarCentroVacacionalAsync,
  eliminarCentroVacacionalAsync
} from '../../../core/redux/acciones/centrosvacacionales/CentrosVacacionalesAcciones';

import { EstadoGeneral } from '../../../core/redux/modelo/EstadoGeneral';
import { GestionCentrosVacacionales } from '../containers/GestionCentrosVacacionales/index';
import { connect } from 'react-redux';

const mapStateToProps = ( state: EstadoGeneral ) => {
  return {
    ...state.calendarios,
    ...state.categoriasUsuarios,
    ...state.centrosVacacionales,
    ...state.ui
  };
};

export const ProveedorGestionCentrosVacacionales = connect( mapStateToProps, {
  listarCentrosVacacionales: listarCentrosVacacionalesAsync,
  agregarNuevoCentroVacacional: guardarNuevoCentroVacacionalAsync,
  actualizarCentroVacacional: actualizarCentroVacacionalAsync,
  eliminarCentroVacacional: eliminarCentroVacacionalAsync
})( GestionCentrosVacacionales );
