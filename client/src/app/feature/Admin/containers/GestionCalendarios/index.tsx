import * as PropTypes from 'prop-types';
import * as React from 'react';
import { DivContainer, DivRow } from '../styles';
import { AccionesCalendario } from '../../components/calendario/AccionesCalendario/index';
import { Calendario } from '../../models/Calendario';
import { CrearCalendario } from '../../components/calendario/CrearCalendario/index';
import { Separation } from '../../../../shared/components/Separation/index';
import { useEffect } from 'react';

interface GestionCalendariosProps {
  calendarios: Array<Calendario>;
  listarCalendarios: () => void;
  agregarNuevoCalendario: ( calendario: Calendario ) => void;
  actualizarCalendario:  ( calendario: Calendario ) => void;
  eliminarCalendario:  ( calendario: Calendario ) => void;
}

export const GestionCalendarios: React.FC<GestionCalendariosProps> = ({
  calendarios,
  listarCalendarios,
  agregarNuevoCalendario,
  actualizarCalendario,
  eliminarCalendario
}) => {

  /**
   * Efecto estado inicial
   */
  useEffect( () => {
    listarCalendarios();
  }, [ listarCalendarios ] );

  return (
    <>
      <h2>Gestión de calendarios <span role="img" title="Calendarios" aria-label="Calendarios">📅</span></h2>
      <p>Administre los calendarios que podrá asignar a los Centros Vacacionales, los <em>festivos o días de alta </em> 
      para la plataforma, corresponden evento único del día por el que cambia de manera dinámica el precio del día completo
      según el rango salarial de un usuario al momento de cotizar.</p>
      <DivContainer>
        <DivRow>
          <CrearCalendario onSubmit={ agregarNuevoCalendario } />
        </DivRow>
        <DivRow>
          <AccionesCalendario 
            calendarios={ calendarios }
            onSubmit={ actualizarCalendario }
            onDeleteClick={ eliminarCalendario }
          />
        </DivRow>
      </DivContainer>
      <Separation />
    </>
  );
};

GestionCalendarios.propTypes = {
  calendarios: PropTypes.array.isRequired
};
