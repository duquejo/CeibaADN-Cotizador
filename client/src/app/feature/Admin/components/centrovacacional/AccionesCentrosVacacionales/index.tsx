import * as PropTypes from 'prop-types';
import * as React from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';

import { CentroVacacional } from '../../../models/CentroVacacional';
import { Table, EmojiDetails } from './styles';

import { ModalCentrosVacacionales } from '../../ui/ModalCentrosVacacionales/index';

import { activarCentroVacacionalEdicion } from '../../../../../core/redux/acciones/centrosvacacionales/CentrosVacacionalesAcciones';
import { abrirModal } from '../../../../../core/redux/acciones/ui/ModalAcciones';
import { tiposModal } from '../../../../../core/redux/modelo/EstadoUI';
import { Small } from '../../../../../shared/components/Small/index';

export interface AccionesCentrosVacacionalesProps {
  centrosVacacionales: Array<CentroVacacional>;
  onSubmit: ( payload: CentroVacacional ) => any;
  onDeleteClick: ( payload: CentroVacacional ) => any;  
}; 

export const AccionesCentrosVacacionales: React.FC<AccionesCentrosVacacionalesProps> = ({
  centrosVacacionales,
  onSubmit,  
  onDeleteClick
}) => {

  const dispatch = useDispatch();

  const handleDeleteCentroVacacional = async ( centroVacacional: CentroVacacional ) => {
    const respuestaModal = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no podrá revertirse',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#dd3333'
    });
    if( respuestaModal.isConfirmed ) {
      onDeleteClick( centroVacacional );
    }
  }

  const handleEditCentroVacacional = ( centroVacacional: CentroVacacional ) => {
    dispatch( abrirModal( tiposModal.MODAL_CENTROS_VACACIONALES ) );
    dispatch( activarCentroVacacionalEdicion( centroVacacional ) );
  }  

  return (
    <>
      <h3>Acciones de los centros vacacionales</h3>
      <Small>A continuación podrá tomar acciones rápidas para gestionar los Centros vacacionales almacenados actualmente, la cantidad de 
        <b> calendarios asociados</b>, así como las <b>categorías de usuario</b> que los clientes podrán visualizar en el cotizador. Recuerde que a pesar de tener múltiples
        calendarios vinculados al Centro Vacacional, sólo se tendrá en cuenta el que figure como <b>"activo"</b>.<br/><br/>Para motivos de agilidad, si lo prefiere, puede dejar
        vacío el campo <b>"asignación de calendario activo"</b>, la plataforma seleccionará de manera automática el primero que agregó en el listado de calendarios.</Small>
      {
        centrosVacacionales && centrosVacacionales.length ?
        <>
          <Table className="category">
            <thead className="category__header">
              <tr>
                <th>
                  <b>Título</b>
                </th>
                <th>
                  <b>Calendarios <Small>asociados</Small></b>
                </th>
                <th>
                  <b>Categorías <Small>usuario</Small></b>
                </th>
                <th>
                  <b>ID Calendario <Small>activo</Small></b>
                </th>
                <th>
                  <b>Editar</b>
                </th>
                <th>
                  <b>Eliminar</b>
                </th>
              </tr>
            </thead>
            <tbody className="calendar__body">
            {
              centrosVacacionales.map( ( centroVacacional: CentroVacacional ) => {
              return (
                <tr className="calendar__details" key={ centroVacacional.id }>
                  <td>{ centroVacacional.nombre }</td>
                  <td><b>({ centroVacacional.calendarios.length })</b></td>
                  <td><b>({ centroVacacional.categoriaUsuarios.length })</b></td>
                  <td><b>{ centroVacacional.calendarioActivo ? `(${ centroVacacional.calendarioActivo })` : 'Ninguno' }</b></td>
                  <EmojiDetails
                    onClick={ () => handleEditCentroVacacional( centroVacacional ) }>
                    <span role="img" title="Editar centro vacacional" aria-label="Editar centro vacacional">✏️</span>
                  </EmojiDetails>
                  <EmojiDetails
                    onClick={ () => handleDeleteCentroVacacional( centroVacacional ) }>
                      <span role="img" title="Eliminar centro vacacional" aria-label="Eliminar centro vacacional">🗑️</span>
                  </EmojiDetails>
                </tr>
              );
              })
            }
            </tbody>
          </Table>
          <ModalCentrosVacacionales 
            handleEditCentroVacacional={ handleEditCentroVacacional }
            onSubmit={ onSubmit }
          />
        </>
        : <p>No hay centros vacacionales disponibles actualmente. <i>Prueba creando uno.</i></p>
      }
    </>  
  );
};

AccionesCentrosVacacionales.propTypes = {
  centrosVacacionales: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};
