export class CategoriaUsuarios {

  readonly #nombre: string;
  readonly #descripcion: string = '';
  readonly #valorAlta: number;
  readonly #valorBaja: number;

  constructor( nombre: string, descripcion: string = '', valorAlta: number, valorBaja: number ) {
    this.#nombre = nombre;
    this.#descripcion = descripcion;
    this.#valorAlta = valorAlta;
    this.#valorBaja = valorBaja;
  }

  get nombre(): string {
    return this.#nombre;
  }

  get descripcion(): string {
    return this.#descripcion;
  }

  get valorAlta(): number {
    return this.#valorAlta;
  }

  get valorBaja(): number {
    return this.#valorBaja;
  }
}