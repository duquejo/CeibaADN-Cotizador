import { CalendarioFestivosDto } from 'src/aplicacion/calendariofestivos/consulta/dto/calendariofestivos.dto';

export abstract class DaoCalendarioFestivos {

  /**
   * Read OP
   */
  abstract obtener( page: number, limit: number ): Promise<CalendarioFestivosDto[]>;
}
