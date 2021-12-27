import { Controller, Post, UsePipes, Body, ValidationPipe, Get, Patch, Param, ParseIntPipe, Query, Delete } from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { DefaultValuePipe } from '../../configuracion/pipes/default-value.pipe';

// Transactional Imports
import { ComandoGuardarCalendarioFestivos } from 'src/aplicacion/calendariofestivos/comando/guardar-calendariofestivos.comando';
import { ManejadorGuardarCalendarioFestivos } from 'src/aplicacion/calendariofestivos/comando/guardar-calendariofestivos.manejador';

import { ComandoActualizarCalendarioFestivos } from 'src/aplicacion/calendariofestivos/comando/actualizar-calendariofestivos.comando';
import { ManejadorActualizarCalendarioFestivos } from 'src/aplicacion/calendariofestivos/comando/actualizar-calendariofestivos.manejador';
import { ManejadorBorrarCalendarioFestivos } from 'src/aplicacion/calendariofestivos/comando/borrar-calendariofestivos.manejador';

// Reading Imports
import { ManejadorObtenerCalendarioFestivos } from 'src/aplicacion/calendariofestivos/consulta/obtener-calendariofestivos.manejador';
import { CalendarioFestivosDto } from 'src/aplicacion/calendariofestivos/consulta/dto/calendariofestivos.dto';

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
    @Query( 'page', new DefaultValuePipe(1), ParseIntPipe ) page = 1,
    @Query('limit', new DefaultValuePipe(100), ParseIntPipe ) limit = 100,
  ): Promise<CalendarioFestivosDto[]> {
    if( page > 0 ) {
      page = ( page - 1 ) * limit;
    } else {
      page = 0;
    }
    return this._manejadorObtenerCalendariosFestivos.ejecutar( page, limit );
  }
}
