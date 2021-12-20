import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';

export class ErrorValorRequerido extends ErrorDeNegocio {
  constructor( mensaje: string ) {
    super( mensaje, ErrorValorRequerido.name );
  }
}
