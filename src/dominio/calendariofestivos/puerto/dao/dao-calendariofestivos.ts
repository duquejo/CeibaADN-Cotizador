import { CalendarioFestivosDto } from 'src/aplicacion/calendariofestivos/consulta/dto/calendariofestivos.dto';

export abstract class DaoCalendarioFestivos {

  /**
   * Read OP
   */
  abstract obtener(): Promise<CalendarioFestivosDto[]>;
}