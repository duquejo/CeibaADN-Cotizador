import { Controller, Post, UsePipes, Body, ValidationPipe, Get, Patch, Param, ParseIntPipe, Query, Delete } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { DefaultNumberPipe } from '../../configuracion/pipes/default-value.pipe';

// Transactional Imports
import { ComandoGuardarCalendarioFestivos } from 'src/aplicacion/calendariofestivos/comando/guardar-calendariofestivos.comando';
import { ManejadorGuardarCalendarioFestivos } from 'src/aplicacion/calendariofestivos/comando/guardar-calendariofestivos.manejador';

import { ComandoActualizarCalendarioFestivos } from 'src/aplicacion/calendariofestivos/comando/actualizar-calendariofestivos.comando';
import { ManejadorActualizarCalendarioFestivos } from 'src/aplicacion/calendariofestivos/comando/actualizar-calendariofestivos.manejador';
import { ManejadorBorrarCalendarioFestivos } from 'src/aplicacion/calendariofestivos/comando/borrar-calendariofestivos.manejador';

// Reading Imports
import { ManejadorObtenerCalendarioFestivos } from 'src/aplicacion/calendariofestivos/consulta/obtener-calendariofestivos.manejador';
import { CalendarioFestivosDto } from 'src/aplicacion/calendariofestivos/consulta/dto/calendariofestivos.dto';
import { constantes } from '../../../dominio/shared/constantes.enum';

@Controller('calendariosFestivos')
export class CalendarioFestivosControlador {
  constructor(
    private readonly _manejadorGuardarCalendarioFestivos: ManejadorGuardarCalendarioFestivos,
    private readonly _manejadorActualizarCalendarioFestivos: ManejadorActualizarCalendarioFestivos,
    private readonly _manejadorBorrarCalendarioFestivos : ManejadorBorrarCalendarioFestivos,
    private readonly _manejadorObtenerCalendariosFestivos: ManejadorObtenerCalendarioFestivos
  ) {}

  /**
   * Crear Calendario EndPoint
   */
  @Post()
  @UsePipes( new ValidationPipe({ transform: true }) )
  crearCalendario ( 
    @Body() comandoGuardarCalendarioFestivos: ComandoGuardarCalendarioFestivos
  ): Promise<ComandoGuardarCalendarioFestivos> {
    return this._manejadorGuardarCalendarioFestivos.ejecutar( comandoGuardarCalendarioFestivos );
  }

  /**
   * Actualizar Calendario Endpoint
   */
  @Patch(':calendarId')
  @UsePipes( new ValidationPipe({ transform: true }) )
  async actualizarCalendario ( 
    @Param( 'calendarId', ParseIntPipe ) calendarId: number, 
    @Body() comandoActualizarCalendarioFestivos: ComandoActualizarCalendarioFestivos
    ) {
    await this._manejadorActualizarCalendarioFestivos.ejecutar( calendarId, comandoActualizarCalendarioFestivos );
  }

  /**
   * Borrar Calendario Endpoint
   */
  @Delete(':calendarId')
  @UsePipes( new ValidationPipe({ transform: true }) )
  async borrarCalendario ( 
    @Param( 'calendarId', ParseIntPipe ) calendarId: number
  ) {
    await this._manejadorBorrarCalendarioFestivos.ejecutar( calendarId );
  }

  /**
   * Obtener todos los calendarios Endpoint
   */
  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
  })
  async obtenerCalendarios(
    @Query('page', new DefaultNumberPipe(constantes.PAGINACION_RECURSOS_GET), ParseIntPipe ) page: number = constantes.PAGINACION_RECURSOS_GET,
    @Query('limit', new DefaultNumberPipe(constantes.LIMITE_RECURSOS_GET), ParseIntPipe ) limit: number = constantes.LIMITE_RECURSOS_GET,
  ): Promise<CalendarioFestivosDto[]> {
    if( page > 0 ) {
      page = ( page - 1 ) * limit;
    } else {
      page = 0;
    }
    return this._manejadorObtenerCalendariosFestivos.ejecutar( page, limit );
  }
}
