import { CalendarioFestivosEntidad } from 'src/infraestructura/calendariofestivos/entidad/calendariofestivos.entidad';
import { CategoriaUsuariosEntidad } from 'src/infraestructura/categoriausuarios/entidad/categoriausuarios.entidad';

export class CentroVacacional {

  readonly #nombre: string;
  readonly #descripcion: string;
  #calendarioActivo: number;
  #calendarios: CalendarioFestivosEntidad[];
  #categoriasUsuarios: CategoriaUsuariosEntidad[];

  constructor( 
    nombre: string, 
    descripcion: string,
    calendarios: CalendarioFestivosEntidad[], 
    categoriaUsuarios: CategoriaUsuariosEntidad[],
    calendarioActivo: number ){

    this.#nombre = nombre;
    this.#descripcion = descripcion;
    this.#calendarios = calendarios;
    this.#categoriasUsuarios = categoriaUsuarios;
    this.#calendarioActivo = calendarioActivo;
  }

  get nombre(): string {
    return this.#nombre;
  }

  get descripcion(): string {
    return this.#descripcion;
  }

  /**
   * Lógica Calendario Activo
   * @get
   */
  get calendarioActivo(): number  {
    if( this.#calendarioActivo === null ) {
      if( this.#calendarios && this.#calendarios.length ) {
        return Number( this.#calendarios[0] );
      } else {
        return null;
      }
    }
    return this.#calendarioActivo;
  }
  /**
   * @set
   */
  set calendarioActivo( calendarioActivo: number ) {
    this.#calendarioActivo = calendarioActivo;
  }

  /**
   * Lógica Calendarios
   * @get
   */
  get calendarios(): CalendarioFestivosEntidad[] {
    return this.#calendarios;
  }
  /**
   * @set
   */
  set calendarios( calendarios: CalendarioFestivosEntidad[] ) {
    this.#calendarios = calendarios;
  }

  /**
   * Lógica Categoría Usuarios
   * @get
   */
  get categoriasUsuarios(): CategoriaUsuariosEntidad[] {
    return this.#categoriasUsuarios;
  }
  /**
   * @set
   */
  set categoriasUsuarios( categoriasUsuarios: CategoriaUsuariosEntidad[] ) {
    this.#categoriasUsuarios = categoriasUsuarios;
  } 
}
