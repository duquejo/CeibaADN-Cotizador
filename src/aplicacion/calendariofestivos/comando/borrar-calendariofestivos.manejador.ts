import { Injectable } from '@nestjs/common';
import { ServicioBorrarCalendarioFestivos } from 'src/dominio/calendariofestivos/servicio/servicio-borrar-calendariofestivos';
@Injectable()
export class ManejadorBorrarCalendarioFestivos {
  constructor(
    private _servicioBorrarCalendarioFestivos: ServicioBorrarCalendarioFestivos
  ){}

  async ejecutar( calendarId: number ): Promise<void> {
    await this._servicioBorrarCalendarioFestivos.ejecutar( calendarId );
  }
}
