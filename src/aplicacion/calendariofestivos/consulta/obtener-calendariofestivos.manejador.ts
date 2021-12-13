import { Injectable } from '@nestjs/common';

import { CalendarioFestivosDto } from 'src/aplicacion/calendariofestivos/consulta/dto/calendariofestivos.dto';
import { DaoCalendarioFestivos } from 'src/dominio/calendariofestivos/puerto/dao/dao-calendariofestivos';
@Injectable()
export class ManejadorObtenerCalendarioFestivos {

  constructor(
    private _daoCalendarioFestivos: DaoCalendarioFestivos
  ) {}

  async ejecutar(): Promise<CalendarioFestivosDto[]> {
    return this._daoCalendarioFestivos.obtener();
  }
}