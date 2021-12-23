import * as PropTypes from 'prop-types';
import * as React from 'react';
import { CentroVacacional } from 'app/feature/Admin/models/CentroVacacional';
import { Cotizacion } from 'app/feature/Cotizador/models/Cotizacion';
import { CrearCotizacion } from '../../components/CrearCotizacion/index';
import { DivContainer } from '../styles';
import { useEffect } from 'react';

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
