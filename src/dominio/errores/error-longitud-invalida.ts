import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';

export class ErrorLongitudInvalida extends ErrorDeNegocio {
  constructor( mensaje: string ) {
    super( mensaje, ErrorLongitudInvalida.name );
  }
}
