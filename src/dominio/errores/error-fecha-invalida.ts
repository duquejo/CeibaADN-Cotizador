import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';

export class ErrorFechaInvalida extends ErrorDeNegocio {
  constructor( mensaje: string ) {
    super( mensaje, ErrorFechaInvalida.name );
  }
}