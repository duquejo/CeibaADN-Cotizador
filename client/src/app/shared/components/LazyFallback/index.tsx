import * as React from 'react';
import { Div, SpanFallback } from './styles';

export const LazyFallback = () => (
  <Div>
    <SpanFallback>Cargando página...</SpanFallback>
  </Div>
);
