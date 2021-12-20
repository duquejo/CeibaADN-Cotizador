import { Injectable } from '@nestjs/common';

import { Cotizacion } from 'src/dominio/cotizacion/modelo/cotizacion';
import { ComandoCrearCotizacion } from 'src/aplicacion/cotizacion/comando/registrar-cotizacion.comando';
import { ServicioCrearCotizacion } from 'src/dominio/cotizacion/servicio/servicio-registrar-cotizacion';
@Injectable()
export class ManejadorCrearCotizacion {
  constructor(
    private _servicioCrearCotizacion: ServicioCrearCotizacion
  ){}

  async ejecutar( comandoCrearCotizacion: ComandoCrearCotizacion ) {
    return this._servicioCrearCotizacion.ejecutar( new Cotizacion(
      comandoCrearCotizacion.centroVacacional,
      comandoCrearCotizacion.categoriaUsuarios,
      comandoCrearCotizacion.personas,
      comandoCrearCotizacion.fechaInicio,
      comandoCrearCotizacion.fechaFin
    ) );
  }
}
