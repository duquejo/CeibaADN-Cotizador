import { Dispatch } from 'redux';
import Swal from 'sweetalert2';

import { Calendario } from 'app/feature/Admin/models/Calendario';
import { TiposAccionesCalendario, TiposAcciones } from './CalendariosTiposAcciones';
import { CalendariosRepositorio } from '../../../api/calendarios.repositorio';

export function listarCalendarios( calendarios: Array<Calendario> ): TiposAccionesCalendario {
  return {
    type: TiposAcciones.LISTAR_CALENDARIO,
    payload: calendarios
  };
}

export function agregarNuevoCalendario( calendario: Calendario ): TiposAccionesCalendario {
  return {
    type: TiposAcciones.AGREGAR_CALENDARIO,
    payload: calendario
  };
}

export function actualizarCalendario( calendario: Calendario ): TiposAccionesCalendario {
  return {
    type: TiposAcciones.ACTUALIZAR_CALENDARIO,
    payload: calendario
  };
}

export function eliminarCalendario( calendario: Calendario ): TiposAccionesCalendario {
  return {
    type: TiposAcciones.ELIMINAR_CALENDARIO,
    payload: calendario
  };
}

export function activarCalendarioEdicion( calendario: Calendario ): TiposAccionesCalendario {
  return {
    type: TiposAcciones.ACTIVAR_CALENDARIO_EDICION,
    payload: calendario
  };
}

export function limpiarCalendario(): TiposAccionesCalendario {
  return {
    type: TiposAcciones.DESACTIVAR_CALENDARIO_EDICION
  };
}

export const guardarNuevoCalendarioAsync = ( nuevoCalendario: Calendario ) => {
  return async ( dispatch: Dispatch ) => {
    try {
      const { data, status } = await CalendariosRepositorio.guardar( nuevoCalendario );
      if( status === 201 ) {
        dispatch( agregarNuevoCalendario( data ) );
        Swal.fire( 'Éxito', `¡Calendario <u>${ data.nombre}</u> añadido!`, 'success' );
      }
    } catch (error) {
      Swal.fire( 'Error', `Algo ha sucedido, recarga la vista e intenta de nuevo.`, 'error' );
    }
  };
};

export const actualizarCalendarioAsync = ( calendario: Calendario ) => {
  return async ( dispatch: Dispatch ) => {
    try {
      await CalendariosRepositorio.actualizar( calendario );
      dispatch( actualizarCalendario( calendario ) );
      Swal.fire( 'Éxito', `El calendario <u>${ calendario.nombre}</u> fue actualizado!`, 'success' );
    } catch (error) {
      Swal.fire( 'Error', `Algo ha sucedido, recarga la vista e intenta de nuevo.`, 'error' );
    }
  };
};

export const eliminarCalendarioAsync = ( calendario: Calendario ) => {
  return async ( dispatch: Dispatch ) => {
    try {
      await CalendariosRepositorio.eliminar( calendario );
      dispatch( eliminarCalendario( calendario ) );
      Swal.fire( 'Éxito', `El calendario <u>${ calendario.nombre }</u> fue eliminado!`, 'success' );
    } catch (error) {
      Swal.fire( 'Error', `Algo ha sucedido, recarga la vista e intenta de nuevo.`, 'error' );
    }
  };
};

export const listarCalendariosAsync = () => {
  return async ( dispatch: Dispatch ) => {
    try {
      const { data: calendarios } = await CalendariosRepositorio.obtener();
      dispatch( listarCalendarios( calendarios ) );
    } catch (error) {
      Swal.fire( 'Error', `No se han listado los calendarios, comprueba tu conexión a internet e intenta nuevamente`, 'error' );
    }
  };
};
