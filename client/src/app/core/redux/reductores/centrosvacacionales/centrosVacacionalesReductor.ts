import { TiposAccionesCentroVacacional, TiposAcciones } from '../../acciones/centrosvacacionales/CentrosVacacionalesTiposAcciones';
import { CentroVacacional } from 'app/feature/Admin/models/CentroVacacional';
import { EstadoCentroVacacional } from '../../modelo/EstadoCentroVacacional';

const initialState: EstadoCentroVacacional = {
  centrosVacacionales: Array<CentroVacacional>(),
  centroVacacionalActivo: null
};

export default function ( state = initialState, action: TiposAccionesCentroVacacional ): EstadoCentroVacacional {
  switch ( action.type ) {

    case TiposAcciones.ACTIVAR_CENTRO_VACACIONAL_EDICION: {
      return {
        ...state,
        centroVacacionalActivo: action.payload,
      };
    }

    case TiposAcciones.DESACTIVAR_CENTRO_VACACIONAL_EDICION: {
      return {
        ...state,
        centroVacacionalActivo: null
      };
    }

    case TiposAcciones.LISTAR_CENTRO_VACACIONAL: {
      return {
        ...state,
        centrosVacacionales: [ ...action.payload ]
      };
    }

    case TiposAcciones.AGREGAR_CENTRO_VACACIONAL: {
      return {
        ...state,
        centrosVacacionales: [ ...state.centrosVacacionales, {
          id: action.payload.id,
          nombre: action.payload.nombre,
          descripcion: action.payload.descripcion,
          calendarios: action.payload.calendarios,
          categoriaUsuarios: action.payload.categoriaUsuarios,
          calendarioActivo: action.payload.calendarioActivo
        } ],
      };
    }

    case TiposAcciones.ACTUALIZAR_CENTRO_VACACIONAL: {
      return {
        ...state,
        centrosVacacionales: state.centrosVacacionales.map( ( centroVacacional: CentroVacacional ) => {
          if( centroVacacional.id === action.payload.id ) {
            return action.payload;
          } else {
            return centroVacacional;
          }
        })
      };
    }

    case TiposAcciones.ELIMINAR_CENTRO_VACACIONAL: {
      return {
        ...state,
        centrosVacacionales: state.centrosVacacionales.filter( ( centroVacacional: CentroVacacional ) => centroVacacional.id !== action.payload.id )
      };
    }

    default:
      return state;
  }
}
