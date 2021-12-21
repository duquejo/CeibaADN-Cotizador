import * as PropTypes from 'prop-types';
import * as React from 'react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';

import { Calendario } from '../../../models/Calendario';
import { Table, EmojiDetails } from './styles';

import { ModalCalendarios } from '../../ui/ModalCalendarios/index';
import { Small } from '../../../../../shared/components/Small/index';

import { abrirModal } from '../../../../../core/redux/acciones/ui/ModalAcciones';
import { activarCalendarioEdicion } from '../../../../../core/redux/acciones/calendarios/CalendariosAcciones';
import { tiposModal } from '../../../../../core/redux/modelo/EstadoUI';

export interface AccionesCalendariosProps {
  calendarios: Array<Calendario>;
  onSubmit: ( payload: Calendario ) => void;
  onDeleteClick: ( payload: Calendario ) => void;
};

export const AccionesCalendario: React.FC<AccionesCalendariosProps> = ({ 
  calendarios,
  onSubmit,
  onDeleteClick
}) => {

  const dispatch = useDispatch();

  const handleDeleteCalendar = async ( calendario: Calendario ) => {
    const respuestaModal = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no podrá revertirse',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#dd3333'
    });

    if( respuestaModal.isConfirmed ) {
      onDeleteClick( calendario );
    }
  };

  const handleEditCalendar = ( calendario: Calendario) => {
    dispatch( abrirModal( tiposModal.MODAL_CALENDARIOS ) );
    dispatch( activarCalendarioEdicion( calendario ) );
  };

  return (
    <>
      <h3>Acciones de los calendarios</h3>
      <Small>Edite rápidamente los calendarios existentes, o elimínelos según el caso. Para ver detalladamente los festivos o días 
        de temporada alta entre al modo edición haciendo click a través del lápiz. el número de festivos o días de temporada alta, lo
        puede visualizar en la columna <em>festivos</em>.</Small>
      {
        calendarios && calendarios.length ?
        <> 
          <Table className="calendar">
            <thead className="calendar__header">
              <tr>
                <th><b>Título</b></th>
                <th><b>Descripción</b></th>
                <th><b>Festivos</b></th>
                <th><b>Editar</b></th>
                <th><b>Eliminar</b></th>
              </tr>
            </thead>
            <tbody className="calendar__body">
            {
              calendarios.map( ( calendario: Calendario ) => {
                return (
                  <tr className="calendar__details" key={ calendario.id }>
                    <td>{ calendario.nombre }</td>
                    <td><Small>{ calendario.descripcion ? calendario.descripcion : 'Sin descripción' }</Small></td>
                    <td><b>{`(${calendario.festivos.length})`}</b></td>
                    <EmojiDetails 
                      onClick={ () => handleEditCalendar( calendario ) }>
                      <span role="img" title="Editar calendario" aria-label="Editar calendario">✏️</span>
                    </EmojiDetails>
                    <EmojiDetails
                      onClick={ () => handleDeleteCalendar( calendario ) }>
                      <span role="img" title="Eliminar calendario" aria-label="Eliminar calendario">🗑️</span>
                    </EmojiDetails>
                  </tr>
                );
              })
            }
            </tbody>
          </Table>
          <ModalCalendarios 
            handleEditCalendar={ handleEditCalendar }
            onSubmit={ onSubmit }
          />
        </>
        : <p>No hay calendarios disponibles actualmente. <i>Prueba creando uno.</i></p>
      }
    </>    
  );
};

AccionesCalendario.propTypes = {
  calendarios: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};