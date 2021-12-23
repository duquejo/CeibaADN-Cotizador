import { EstadoGeneral } from '../../../core/redux/modelo/EstadoGeneral';
import { GestionCotizaciones } from '../containers/GestionCotizaciones/index';
import { connect } from 'react-redux';
import { guardarNuevaCotizacionAsync } from '../../../core/redux/acciones/cotizaciones/CotizacionesAcciones';
import { listarCentrosVacacionalesAsync } from '../../../core/redux/acciones/centrosvacacionales/CentrosVacacionalesAcciones';

const mapStateToProps = ( state: EstadoGeneral ) => {
  return {
    ...state.centrosVacacionales
  };
};

export const ProveedorGestionCotizaciones = connect( mapStateToProps, {
  listarCentrosVacacionales: listarCentrosVacacionalesAsync,
  agregarNuevaCotizacion: guardarNuevaCotizacionAsync
})( GestionCotizaciones );
