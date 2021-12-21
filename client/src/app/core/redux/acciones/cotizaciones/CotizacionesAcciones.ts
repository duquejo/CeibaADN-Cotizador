import Swal from 'sweetalert2';

import { Cotizacion } from '../../../../feature/Cotizador/models/Cotizacion';

import { TiposAccionesCotizacion, TiposAcciones } from './CotizacionesTiposAcciones';
import { CotizacionRepositorio } from '../../../api/cotizaciones.repositorio';
import { cotizacionTemplate } from 'app/shared/utils/miscfunctions';

export function agregarNuevaCotizacion( cotizacion: Cotizacion ): TiposAccionesCotizacion {
  return {
    type: TiposAcciones.AGREGAR_COTIZACIONES,
    payload: cotizacion
  };
}

export const obtenerCotizacionAsync = async ( cotizacionId: number ) => {
  try {
    const { data, status } = await CotizacionRepositorio.obtener( cotizacionId );
    if( data !== '' && status === 200 ) {
      Swal.fire({
        title: `Información de la cotización`,
        html: cotizacionTemplate( data, true ),
        icon: 'info',
        width: '80%',
      });
    } else {
      Swal.fire({
        title: `Aviso`,
        text: `No se encontró alguna cotización con el identificador #${ cotizacionId }`,
        icon: 'warning'
      });
    }
  } catch (error) {
    console.error( error );
    Swal.fire( 'Error', `Algo ha sucedido, recarga la vista e intenta de nuevo.`, 'error' );
  }
};

export const guardarNuevaCotizacionAsync = ( nuevaCotizacion: Cotizacion ) => {
  return async () => {
    try {
      const { data, status } = await CotizacionRepositorio.guardar( nuevaCotizacion );
      if( status === 201 ) {
        Swal.fire({
          title: `¡La cotización fue realizada con éxito!`,
          html: cotizacionTemplate( data ),
          icon: 'success',
          width: '80%',
        });
      }
    } catch (error) {
      console.error( error );
      Swal.fire( 'Error', `Algo ha sucedido, recarga la vista e intenta de nuevo.`, 'error' );
    }
  };
};
