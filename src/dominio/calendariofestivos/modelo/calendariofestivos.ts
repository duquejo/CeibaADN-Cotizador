import * as moment from 'moment';
import { ErrorFechaInvalida } from 'src/dominio/errores/error-fecha-invalida';
import { constantes } from 'src/dominio/shared/constantes.enum';

export class CalendarioFestivos {

  readonly #nombre: string;
  readonly #descripcion: string = '';
  readonly #festivos: string[] = [];

  constructor(nombre: string, descripcion: string = '', festivos: string[] = [] ) {
    this.#nombre = nombre;
    this.#descripcion = descripcion;
    this.#festivos = festivos.length > 0 ? this.convertirFecha( festivos ) : [];
  }

  private esValidoFormatoFecha( fecha: string ): boolean {
    return moment( fecha, constantes.FORMATO_FECHA, true ).isValid();
  }

  private convertirFecha( festivos: string[] ): string[] {
    return festivos.map( festivo => {
      /**
       * Comprobar validez de fecha
       */
      if( ! this.esValidoFormatoFecha( festivo ) )
        throw new ErrorFechaInvalida( `{${ festivo }} no es una fecha válida` );
      return moment( festivo, constantes.FORMATO_FECHA, true ).format();
    } );
  }

  get nombre(): string {
    return this.#nombre;
  }

  get descripcion(): string {
    return this.#descripcion;
  }

  get festivos(): string[] {
    return this.#festivos;
  }
}