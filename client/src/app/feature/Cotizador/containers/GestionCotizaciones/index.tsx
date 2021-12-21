import * as React from 'react';
import { useEffect } from 'react';
import * as PropTypes from 'prop-types';

import { CentroVacacional } from 'app/feature/Admin/models/CentroVacacional';
import { Cotizacion } from 'app/feature/Cotizador/models/Cotizacion';

import { DivContainer } from '../styles';
import { CrearCotizacion } from '../../components/CrearCotizacion/index';

interface GestionCotizacionesProps {
  centrosVacacionales: Array<CentroVacacional>;
  listarCentrosVacacionales: () => void;
  agregarNuevaCotizacion: ( calendario: Cotizacion ) => void;
}

export const GestionCotizaciones: React.FC<GestionCotizacionesProps> = ({
  centrosVacacionales,
  listarCentrosVacacionales,
  agregarNuevaCotizacion,
}) => {

  /**
   * Efecto estado inicial
   */
  useEffect( () => {
    listarCentrosVacacionales();
  }, [ listarCentrosVacacionales ] );

  return (
    <>
      <h2>Generación de cotizaciones</h2>
      <p>Proporcione la información según la disponibilidad de los calendarios que vaya seleccionando en el formulario</p>
      <DivContainer>
        <CrearCotizacion 
          onSubmit={ agregarNuevaCotizacion } 
          centrosvacacionales={ centrosVacacionales }
        />
      </DivContainer>
    </>
  );
};

GestionCotizaciones.propTypes = {
  centrosVacacionales: PropTypes.array.isRequired
};
