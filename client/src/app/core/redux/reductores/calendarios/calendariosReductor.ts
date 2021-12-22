import { TiposAcciones, TiposAccionesCalendario } from '../../acciones/calendarios/CalendariosTiposAcciones';

import { Calendario } from 'app/feature/Admin/models/Calendario';
import { EstadoCalendario } from '../../modelo/EstadoCalendario';

const initialState: EstadoCalendario = {
  calendarios: Array<Calendario>(),
  calendarioActivo: null
};

export default function ( state = initialState, action: TiposAccionesCalendario ): EstadoCalendario {
  switch ( action.type ) {

    case TiposAcciones.ACTIVAR_CALENDARIO_EDICION: {
      return {
        ...state,
        calendarioActivo: action.payload
      };
    }

    case TiposAcciones.DESACTIVAR_CALENDARIO_EDICION: {
      return {
        ...state,
        calendarioActivo: null
      };
    }

    case TiposAcciones.LISTAR_CALENDARIO: {
      return {
        ...state,
        calendarios: [ ...action.payload ]
      };
    }

    case TiposAcciones.AGREGAR_CALENDARIO: {
      return {
        ...state,
        calendarios: [...state.calendarios, {
          id: action.payload.id,
          nombre: action.payload.nombre,
          descripcion: action.payload.descripcion,
          festivos: action.payload.festivos
        } ],
      };
    }

    case TiposAcciones.ACTUALIZAR_CALENDARIO: {
      return {
        ...state,
        calendarios: state.calendarios.map( ( calendario: Calendario ) => {
          if( calendario.id === action.payload.id ) {
            return action.payload;
          } else {
            return calendario;
          }
        })
      };
    }

    case TiposAcciones.ELIMINAR_CALENDARIO: {
      return {
        ...state,
        calendarios: state.calendarios.filter( ( calendario: Calendario ) => calendario.id !== action.payload.id )
      };
    }

    default:
      return state;
  }
}
