import { Injectable } from '@nestjs/common';
import { CalendarioFestivos } from 'src/dominio/calendariofestivos/modelo/calendariofestivos';
import { ServicioGuardarCalendarioFestivos } from 'src/dominio/calendariofestivos/servicio/servicio-guardar-calendariofestivos';
import { ComandoGuardarCalendarioFestivos } from 'src/aplicacion/calendariofestivos/comando/guardar-calendariofestivos.comando';
@Injectable()
export class ManejadorGuardarCalendarioFestivos {
  constructor(
    private _servicioGuardarCalendarioFestivos: ServicioGuardarCalendarioFestivos
  ){}

  async ejecutar( comandoGuardarCalendarioFestivos: ComandoGuardarCalendarioFestivos ) {
    return this._servicioGuardarCalendarioFestivos.ejecutar(
      new CalendarioFestivos(
        comandoGuardarCalendarioFestivos.nombre,
        comandoGuardarCalendarioFestivos.descripcion,
        comandoGuardarCalendarioFestivos.festivos,
      ),
    );
  }
}
