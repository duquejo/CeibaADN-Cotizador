import {
  actualizarCalendarioAsync,
  eliminarCalendarioAsync,
  guardarNuevoCalendarioAsync,
  listarCalendariosAsync
} from '../../../core/redux/acciones/calendarios/CalendariosAcciones';

import { EstadoGeneral } from '../../../core/redux/modelo/EstadoGeneral';
import { GestionCalendarios } from '../containers/GestionCalendarios/index';
import { connect } from 'react-redux';

const mapStateToProps = ( state: EstadoGeneral ) => {
  return {
    ...state.calendarios, 
    ...state.ui
  };
};

export const ProveedorGestionCalendarios = connect( mapStateToProps, {
  listarCalendarios: listarCalendariosAsync,
  agregarNuevoCalendario: guardarNuevoCalendarioAsync,
  actualizarCalendario: actualizarCalendarioAsync,
  eliminarCalendario: eliminarCalendarioAsync
})( GestionCalendarios );
