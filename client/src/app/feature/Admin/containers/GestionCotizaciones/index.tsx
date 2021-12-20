import * as React from 'react';

import { DivContainer, DivRow } from '../styles';
import { BuscarCotizacion } from '../../components/cotizacion/BuscarCotizacion/index';
import { Separation } from '../../../../shared/components/Separation/index';

export const GestionCotizaciones: React.FC<any> = () => {
  return (
    <>
      <h2>Búsqueda de cotizaciones por Identificador <span role="img" title="Búsqueda cotizaciones" aria-label="Búsqueda cotizaciones">🔎</span></h2>
      <p>Realice una búsqueda rápida por identificador para conocer los valores de la misma.</p>
      <DivContainer>
        <DivRow>
          <BuscarCotizacion />
        </DivRow>
      </DivContainer>
      <Separation />
    </>
  );
};