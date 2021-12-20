import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';

export class ErrorCotizacionInvalida extends ErrorDeNegocio {
  constructor( mensaje: string ) {
    super( mensaje, ErrorCotizacionInvalida.name );
  }
}
