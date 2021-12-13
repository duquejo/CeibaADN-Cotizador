import { Controller, Post, UsePipes, Body, ValidationPipe, Get, Patch, Param, ParseIntPipe, Delete } from '@nestjs/common';

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
  async crearCalendario ( 
    @Body() comandoGuardarCalendarioFestivos: ComandoGuardarCalendarioFestivos
  ): Promise<void> {
    await this._manejadorGuardarCalendarioFestivos.ejecutar( comandoGuardarCalendarioFestivos );
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
  async obtenerCalendarios(): Promise<CalendarioFestivosDto[]> {
    return this._manejadorObtenerCalendariosFestivos.ejecutar();
  }
}
