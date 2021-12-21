import { Dispatch } from 'redux';
import Swal from 'sweetalert2';

import { EstadoGeneral } from '../../modelo/EstadoGeneral';
import { CentroVacacional } from 'app/feature/Admin/models/CentroVacacional';
import { TiposAccionesCentroVacacional, TiposAcciones } from './CentrosVacacionalesTiposAcciones';
import { CentrosVacacionalesRepositorio } from '../../../api/centrosvacacionales.repositorio';
import { extraerIdsDeArray } from '../../../../shared/utils/miscfunctions';

export function listarCentrosVacacionales( centrosVacacionales: Array<CentroVacacional> ): TiposAccionesCentroVacacional {
  return {
    type: TiposAcciones.LISTAR_CENTRO_VACACIONAL,
    payload: centrosVacacionales
  };
}

export function agregarNuevoCentroVacacional( centroVacacional: CentroVacacional ): TiposAccionesCentroVacacional {
  return {
    type: TiposAcciones.AGREGAR_CENTRO_VACACIONAL,
    payload: centroVacacional
  };
}

export function actualizarCentroVacacional( centroVacacional: CentroVacacional ): TiposAccionesCentroVacacional {
  return {
    type: TiposAcciones.ACTUALIZAR_CENTRO_VACACIONAL,
    payload: centroVacacional
  };
}

export function eliminarCentroVacacional( centroVacacional: CentroVacacional ): TiposAccionesCentroVacacional {
  return {
    type: TiposAcciones.ELIMINAR_CENTRO_VACACIONAL,
    payload: centroVacacional
  };
}

export function activarCentroVacacionalEdicion( centroVacacional: CentroVacacional ): TiposAccionesCentroVacacional {
  return {
    type: TiposAcciones.ACTIVAR_CENTRO_VACACIONAL_EDICION,
    payload: centroVacacional
  };
}

export function limpiarCentroVacacional(): TiposAccionesCentroVacacional {
  return {
    type: TiposAcciones.DESACTIVAR_CENTRO_VACACIONAL_EDICION
  };
}

export const guardarNuevoCentroVacacionalAsync = ( nuevoCentroVacacional: CentroVacacional ) => {
  return async ( dispatch: Dispatch, getState: () => EstadoGeneral ) => {

    const { calendarios } = getState().calendarios;
    const { categoriasUsuarios } = getState().categoriasUsuarios;

    try {
      const { data, status } = await CentrosVacacionalesRepositorio.guardar( nuevoCentroVacacional );
      if( status === 201 ) {
         /**
          * Actualizar estado centro vacacional
          */
         const calendariosFiltrados = extraerIdsDeArray( data.calendarios, calendarios );
         const categoriasUsuariosFiltradas = extraerIdsDeArray( data.categoriaUsuarios, categoriasUsuarios );

         // Actualización objetos
         data.calendarios = calendariosFiltrados;
         data.categoriaUsuarios = categoriasUsuariosFiltradas;
   
         dispatch( agregarNuevoCentroVacacional( data ) );
         Swal.fire( 'Éxito', `El centro vacacionak <u>${ data.nombre }</u> añadido!`, 'success' );
      }
    } catch (error) {
      Swal.fire( 'Error', `Algo ha sucedido`, 'error' );
    }
  };
};

export const actualizarCentroVacacionalAsync = ( centroVacacional: CentroVacacional ) => {
  return async ( dispatch: Dispatch, getState: () => EstadoGeneral ) => {
    
    const { calendarios } = getState().calendarios;
    const { categoriasUsuarios } = getState().categoriasUsuarios;

    try {

      await CentrosVacacionalesRepositorio.actualizar( centroVacacional );
      
      /**
       * Actualizar estado centro vacacional
       */
      const calendariosFiltrados = extraerIdsDeArray( centroVacacional.calendarios, calendarios );
      const categoriasUsuariosFiltradas = extraerIdsDeArray( centroVacacional.categoriaUsuarios, categoriasUsuarios );

      // Actualización objetos
      centroVacacional.calendarios = calendariosFiltrados;
      centroVacacional.categoriaUsuarios = categoriasUsuariosFiltradas;

      dispatch( actualizarCentroVacacional( centroVacacional ) );
      Swal.fire( 'Éxito', `El centro vacacional <u>${ centroVacacional.nombre}</u> fue actualizado!`, 'success' );
    } catch ( error ) {
      Swal.fire( 'Error', `Algo ha sucedido, recarga la vista e intenta de nuevo.`, 'error' );
    }
  };
};

export const eliminarCentroVacacionalAsync = ( centroVacacional: CentroVacacional ) => {
  return async ( dispatch: Dispatch ) => {
    try {
      await CentrosVacacionalesRepositorio.eliminar( centroVacacional );
      dispatch( eliminarCentroVacacional( centroVacacional ) );
      Swal.fire( 'Éxito', `El centro vacacional <u>${ centroVacacional.nombre }</u> fue eliminado!`, 'success' );
    } catch (error) {
      Swal.fire( 'Error', `Algo ha sucedido, recarga la vista e intenta de nuevo.`, 'error' );
    }
  };
};

export const listarCentrosVacacionalesAsync = () => {
  return async ( dispatch: Dispatch ) => {
    try {
      const { data: centrosVacacionales } = await CentrosVacacionalesRepositorio.obtener();
      dispatch( listarCentrosVacacionales( centrosVacacionales ) );
    } catch (error) {
      Swal.fire( 'Error', `No se han obtenido los centros vacacionales, comprueba tu conexión a internet e intenta nuevamente`, 'error' );
    }
  };
};
