import { ErrorLongitudInvalida } from 'src/dominio/errores/error-longitud-invalida';
import { constantes } from 'src/dominio/shared/constantes.enum';
export class Usuario {
  readonly #nombre: string;
  readonly #clave: string;
  readonly #fechaCreacion: Date;

  constructor(nombre: string, clave: string, fechaCreacion: string) {
    this.validarTamanoClave(clave);
    this.#nombre = nombre;
    this.#clave = clave;
    this.#fechaCreacion = new Date( fechaCreacion );
  }

  private validarTamanoClave(clave: string) {
    if (clave.length < constantes.NUMERO_MINIMO_CARACTERES_CLAVE) {
      throw new ErrorLongitudInvalida(
        `El tamaño mínimo de la clave debe ser ${ constantes.NUMERO_MINIMO_CARACTERES_CLAVE }`,
      );
    }
  }

  get nombre(): string {
    return this.#nombre;
  }

  get clave(): string {
    return this.#clave;
  }

  get fechaCreacion(): Date {
    return this.#fechaCreacion;
  }
}
