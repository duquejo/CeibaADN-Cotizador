export class ErrorDeNegocio extends Error {
  constructor( mensaje: string, clase?: string ) {
    super( mensaje );
    this.name = clase || ErrorDeNegocio.name;
  }
}