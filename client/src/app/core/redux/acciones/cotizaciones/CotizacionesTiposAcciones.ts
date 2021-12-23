import { Cotizacion } from 'app/feature/Cotizador/models/Cotizacion';

export enum TiposAcciones {
  AGREGAR_COTIZACIONES = 'AGREGAR_COTIZACIONES'
}

interface AccionAgregarCotizacion {
  type: typeof TiposAcciones.AGREGAR_COTIZACIONES;
  payload: Cotizacion;
}

export type TiposAccionesCotizacion = 
  | AccionAgregarCotizacion;
