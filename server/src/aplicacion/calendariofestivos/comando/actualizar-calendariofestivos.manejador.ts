import { Injectable } from '@nestjs/common';
import { CalendarioFestivos } from 'src/dominio/calendariofestivos/modelo/calendariofestivos';
import { ComandoActualizarCalendarioFestivos } from 'src/aplicacion/calendariofestivos/comando/actualizar-calendariofestivos.comando';
import { ServicioActualizarCalendarioFestivos } from 'src/dominio/calendariofestivos/servicio/servicio-actualizar-calendariofestivos';
@Injectable()
export class ManejadorActualizarCalendarioFestivos {
  constructor(
    private _servicioActualizarCalendarioFestivos: ServicioActualizarCalendarioFestivos
  ){}

  async ejecutar( calendarId: number, comandoGuardarCalendarioFestivos: ComandoActualizarCalendarioFestivos ): Promise<void> {
    await this._servicioActualizarCalendarioFestivos.ejecutar(
      calendarId,
      new CalendarioFestivos(
        comandoGuardarCalendarioFestivos.nombre,
        comandoGuardarCalendarioFestivos.descripcion,
        comandoGuardarCalendarioFestivos.festivos
      )
    );
  }
}
