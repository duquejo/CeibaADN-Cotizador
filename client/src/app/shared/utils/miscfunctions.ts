import moment from 'moment';
import { ISelectionOptions } from '../../feature/Admin/models/FormSelector';

export const obtenerCalendarioActivo = (
    calendarioActivo: string | number | null = null, 
    todosCalendarios: ISelectionOptions[] ) => {

    const estaActivoEnCalendarios = todosCalendarios.some( 
        ( calendario: ISelectionOptions ) => {
        return Number( calendario.value ) === Number( calendarioActivo );
    });

    if( calendarioActivo === '' || ! estaActivoEnCalendarios ) {
      if( todosCalendarios.length > 0 && todosCalendarios[0].value ) {
        return Number( todosCalendarios[0].value );
      } else {
        return null;
      }
    }
    return Number( calendarioActivo );
};

export const extraerIdsDeArray = ( needle: Array<any>, haystack: Array<any> ) => {
  
  if( ! needle.length ) {
    return [];
  }

  const needleIds = needle.map( ( elemento: any ) => {
    if( ! elemento.hasOwnProperty( 'id' ) ){
      return elemento;
    }
    return elemento.id;
  } );

  return haystack.filter( ( elemento: any ) => {
    return ( needleIds.indexOf( elemento!.id ) !== -1 );
  });
};

export const cotizacionTemplate = ( cotizacion: any, allInfo = false ) => {

  const identificador = allInfo ? '<th>Identificador</th>' : '';
  const centroVacacionalId = allInfo ? `<td>${ cotizacion.centroVacacional?.id }</td>` : '';
  const centroVacacionalCodigo = allInfo ? `<td>${ cotizacion.centroVacacional?.codigo }</td>` : '';
  const categoriaUsuariosId = allInfo ? `<td>${ cotizacion.categoriaUsuarios.id }</td>` : '';
  const categoriaUsuariosDescripcion = cotizacion.categoriaUsuarios?.descripcion ? cotizacion.categoriaUsuarios.descripcion : '';
  const centroVacacionalDescripcion = cotizacion.centroVacacional?.descripcion ? cotizacion.centroVacacional.descripcion : '';

  return `<table class="resultados__table">
            <caption>Información general</caption>
            <thead>
              <tr>
                <th>Identificador</th>
                <th>Código</th>
                <th>Fecha de inicio</th>
                <th>Fecha de finalización</th>
                <th># de personas</th>
                <th>Total grupo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${ cotizacion.id }</td>
                <td>${ cotizacion.codigo }</td>
                <td>${ moment( cotizacion.fechaInicio ).format('YYYY-MM-DD') }</td>
                <td>${ moment( cotizacion.fechaFin ).format('YYYY-MM-DD') }</td>
                <td>${ cotizacion.personas }</td>
                <td>$ ${ cotizacion.total }</td>
              </tr>
            </tbody>
          </table>
          <table class="resultados__table">
            <caption>Información del centro vacacional</caption>
            <thead>
              <tr>
                ${ identificador }
                <th>Nombre</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                ${ centroVacacionalId }
                ${ centroVacacionalCodigo }
                <td>${ cotizacion.centroVacacional?.nombre }</td>
                <td>${ centroVacacionalDescripcion }</td>
              </tr>
            </tbody>
            <table class="resultados__table">
              <caption>Información de la categoría de usuario</caption>
              <thead>
                <tr>
                  ${ identificador }
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Valor de día temporada alta</th>
                  <th>Valor de día temporada baja</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  ${ categoriaUsuariosId }
                  <td>${ cotizacion.categoriaUsuarios.nombre }</td>
                  <td>${ categoriaUsuariosDescripcion }</td>
                  <td>$ ${ cotizacion.categoriaUsuarios.valorAlta }</td>
                  <td>$ ${ cotizacion.categoriaUsuarios.valorBaja }</td>
                </tr>
              </tbody>                
            </table>
          </table>`;
};
