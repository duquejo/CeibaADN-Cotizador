import * as PropTypes from 'prop-types';
import * as React from 'react';
import { DivContainer, DivRow } from '../styles';
import { AccionesCentrosVacacionales } from '../../components/centrovacacional/AccionesCentrosVacacionales/index';
import { Calendario } from '../../models/Calendario';
import { CategoriaUsuarios } from '../../models/CategoriaUsuarios';
import { CentroVacacional } from '../../models/CentroVacacional';
import { CrearCentroVacacional } from '../../components/centrovacacional/CrearCentroVacacional/index';
import { Separation } from '../../../../shared/components/Separation/index';
import { useEffect } from 'react';

interface GestionCentrosVacacionalesProps {
  centrosVacacionales: Array<CentroVacacional>;
  calendarios: Array<Calendario>;
  categoriasUsuarios: Array<CategoriaUsuarios>;
  listarCentrosVacacionales: () => void;
  agregarNuevoCentroVacacional: ( centroVacacional: CentroVacacional ) => void;
  actualizarCentroVacacional:  ( centroVacacional: CentroVacacional ) => void;
  eliminarCentroVacacional:  ( centroVacacional: CentroVacacional ) => void;
}

export const GestionCentrosVacacionales: React.FC<GestionCentrosVacacionalesProps> = ({
  centrosVacacionales,
  calendarios,
  categoriasUsuarios,
  listarCentrosVacacionales,
  agregarNuevoCentroVacacional,
  actualizarCentroVacacional,
  eliminarCentroVacacional
}) => {
  
  /**
   * Efecto estado inicial
   */
   useEffect( () => {
    listarCentrosVacacionales();
  }, [ listarCentrosVacacionales ] );

  return (
    <>
      <h2>Gestión de centros vacacionales <span role="img" title="Centros vacacionales" aria-label="Centros vacacionales">⛱️</span></h2>
      <p>Administre los centros vacacionales que los usuarios tendrán a su disposición en el cotizador.</p>
      <DivContainer>
        <DivRow>
          <CrearCentroVacacional 
            onSubmit={ agregarNuevoCentroVacacional }
            optionCalendarios={ calendarios }
            optionCategoriasUsuarios={ categoriasUsuarios }
          />
        </DivRow>
        <DivRow>
          <AccionesCentrosVacacionales 
            centrosVacacionales={ centrosVacacionales }
            onSubmit={ actualizarCentroVacacional }
            onDeleteClick={ eliminarCentroVacacional }
          />
        </DivRow>
      </DivContainer>
      <Separation />      
    </>
  );
};

GestionCentrosVacacionales.propTypes = {
  centrosVacacionales: PropTypes.array.isRequired,
  calendarios: PropTypes.array.isRequired,
  categoriasUsuarios: PropTypes.array.isRequired,
};
