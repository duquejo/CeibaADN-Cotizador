import { Controller, Post, UsePipes, Body, ValidationPipe, Get, Param, ParseIntPipe } from '@nestjs/common';

import { ComandoCrearCotizacion } from 'src/aplicacion/cotizacion/comando/registrar-cotizacion.comando';
import { ManejadorCrearCotizacion } from 'src/aplicacion/cotizacion/comando/registrar-cotizacion.manejador';

import { CotizacionDto } from 'src/aplicacion/cotizacion/consulta/dto/cotizacion.dto';
import { ManejadorObtenerCotizacion } from 'src/aplicacion/cotizacion/consulta/obtener-cotizacion.manejador';

@Controller('cotizaciones')
export class CotizacionControlador {
  constructor(
    private readonly _manejadorCrearCotizacion: ManejadorCrearCotizacion,
    private readonly _manejadorObtenerCotizacion: ManejadorObtenerCotizacion
  ) {}

  @Post()
  @UsePipes( new ValidationPipe({ transform: true }) )
  async crearCotizacion(
    @Body() comandoCrearCotizacion: ComandoCrearCotizacion
  ): Promise<void> {
    await this._manejadorCrearCotizacion.ejecutar( comandoCrearCotizacion );
  }

  /**
   * Obtener todas las cotizaciones Endpoint
   */
   @Get(':cotizacionId')
   async obtenerCotizacion( @Param( 'cotizacionId', ParseIntPipe ) cotizacionId: number ): Promise<CotizacionDto> {
     return this._manejadorObtenerCotizacion.ejecutar( cotizacionId );
   }
}