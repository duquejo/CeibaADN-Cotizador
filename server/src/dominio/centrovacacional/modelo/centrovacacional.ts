import { CalendarioFestivosEntidad } from 'src/infraestructura/calendariofestivos/entidad/calendariofestivos.entidad';
import { CategoriaUsuariosEntidad } from 'src/infraestructura/categoriausuarios/entidad/categoriausuarios.entidad';

export class CentroVacacional {

  readonly #nombre: string;
  readonly #descripcion: string;
  #calendarioActivo: number;
  #calendarios: CalendarioFestivosEntidad[]|number[];
  #categoriasUsuarios: CategoriaUsuariosEntidad[]|number[];

  constructor( 
    nombre: string, 
    descripcion: string,
    calendarios: CalendarioFestivosEntidad[]|number[], 
    categoriaUsuarios: CategoriaUsuariosEntidad[]|number[],
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
    if( this.#calendarioActivo !== null ) {
      return this.#calendarioActivo;
    }

    if( this.#calendarios?.length ) {
      return Number( this.#calendarios[0] );
    }
    return null;
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
  get calendarios(): CalendarioFestivosEntidad[]|number[] {
    return this.#calendarios;
  }
  /**
   * @set
   */
  set calendarios( calendarios: CalendarioFestivosEntidad[]|number[] ) {
    this.#calendarios = calendarios;
  }

  /**
   * Lógica Categoría Usuarios
   * @get
   */
  get categoriasUsuarios(): CategoriaUsuariosEntidad[]|number[] {
    return this.#categoriasUsuarios;
  }
  /**
   * @set
   */
  set categoriasUsuarios( categoriasUsuarios: CategoriaUsuariosEntidad[]|number[] ) {
    this.#categoriasUsuarios = categoriasUsuarios;
  } 
}
