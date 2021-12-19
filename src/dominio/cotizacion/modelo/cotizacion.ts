import * as moment from 'moment';

import { constantes } from 'src/dominio/shared/constantes.enum';
import { ICotizacion } from 'src/dominio/cotizacion/modelo/interface.cotizacion';
import { ErrorFechaInvalida } from 'src/dominio/errores/error-fecha-invalida';
import { ErrorValorRequerido } from 'src/dominio/errores/error-valor-requerido';
import { ErrorCotizacionInvalida } from 'src/dominio/errores/error-cotizacion-invalida';

import { CentroVacacionalEntidad } from 'src/infraestructura/centrovacacional/entidad/centrovacacional.entidad';
import { CategoriaUsuariosEntidad } from 'src/infraestructura/categoriausuarios/entidad/categoriausuarios.entidad';
export class Cotizacion {

  readonly #personas: number;
  readonly #fechaInicio: string;
  readonly #fechaFin: string;
  #centroVacacional: number | CentroVacacionalEntidad;
  #categoriaUsuarios: number | CategoriaUsuariosEntidad;

  constructor(
      centroVacacional: number, 
      categoriaUsuarios: number,
      personas: number,
      fechaInicio: string,
      fechaFin: string
    ){

    // Asignar y validar fechas
    this.#fechaInicio = this.convertirFecha( fechaInicio );
    this.#fechaFin = this.convertirFecha( fechaFin );

    // Comparar fechas
    this.compararFechas( this.#fechaInicio, this.#fechaFin );    

    // Parámetros base del constructor
    this.#centroVacacional = centroVacacional;
    this.#categoriaUsuarios = categoriaUsuarios;

    this.#personas = personas;
  }

  get personas(): number {
    return this.#personas;
  }

  get fechaInicio(): string {
    return this.#fechaInicio;
  }

  get fechaFin(): string {
    return this.#fechaFin;
  }  

  /**
   * Getter y Setter centroVacacional
   */
  get centroVacacional(): number | CentroVacacionalEntidad {
    return this.#centroVacacional;
  }
  set centroVacacional( centroVacacional: number | CentroVacacionalEntidad ) {
    this.#centroVacacional = centroVacacional;
  }

  /**
   * Getter y Setter categoriaUsuarios
   */
  get categoriaUsuarios(): number | CategoriaUsuariosEntidad {
    return this.#categoriaUsuarios;
  }

  set categoriaUsuarios( categoriaUsuarios: number | CategoriaUsuariosEntidad ) {
    this.#categoriaUsuarios = categoriaUsuarios;
  }

  private compararFechas( fechaInicio: string, fechaFin: string ): boolean {
    if( fechaInicio > fechaFin ) {
      const fechaFinFormateada =  moment( fechaFin ).format( constantes.FORMATO_FECHA );
      const fechaInicioFormateada = moment( fechaInicio ).format( constantes.FORMATO_FECHA );
      throw new ErrorFechaInvalida( 
        `{${ fechaFinFormateada }} debe ser mayor que {${ fechaInicioFormateada }}` 
      );
    }
    return true;
  }

  private convertirFecha( fecha: string ): string {
    if( ! fecha ) {
      throw new ErrorValorRequerido( `Debes proporcionar una fecha` );
    }

    if( ! this.esValidoFormatoFecha( fecha ) ) {
      throw new ErrorFechaInvalida( `{${ fecha }} no es una fecha válida` );
    }
    return moment( fecha, constantes.FORMATO_FECHA, true ).format();
  }

  private esValidoFormatoFecha( fecha: string ): boolean {
    return moment( fecha, constantes.FORMATO_FECHA, true ).isValid();
  }

  /**
   * Calcular lógica de cotización
   * 
   * @param {CentroVacacionalEntidad} centroVacacional
   * @param {CategoriaUsuarios} categoriaUsuarios 
   * @param {string} fechaInicio 
   * @param {string} fechaFin 
   * 
   * @returns {number}
   */
  public calcularCotizacion (
    centroVacacional  : CentroVacacionalEntidad,
    categoriaUsuarios : CategoriaUsuariosEntidad ) : ICotizacion {

    const momFechaInicio: moment.Moment = moment( this.#fechaInicio, constantes.FORMATO_FECHA ),
          momFechaFin: moment.Moment    = moment( this.#fechaFin, constantes.FORMATO_FECHA ),
          diasTotales: number = momFechaFin.diff( momFechaInicio, 'days' )+1;

    let diasAlta = 0,
        diasBaja = 0,
        totalAlta = 0,
        totalBaja = 0,
        totalIndividual = 0;

    // Obteniendo festivos del calendario activo
    if( ! ( centroVacacional.calendarios && centroVacacional.calendarios.length > 0 ) ) {
      throw new ErrorCotizacionInvalida( `El centro vacacional no tiene calendarios disponibles en el momento` );
    }
    
    // Obtener calendario activo apartir del almacenado en DB
    const calendarioActivo = centroVacacional.calendarios.find( calendario => calendario.id === centroVacacional.calendarioActivo );
    
    if( ! calendarioActivo ) {
      throw new ErrorCotizacionInvalida( `El centro vacacional no tiene calendarios disponibles en el momento` );
    }

    if( calendarioActivo.festivos && calendarioActivo.festivos.length > 0 ) {
      
      calendarioActivo.festivos.forEach( festivo => {  
        const momFestivo  = moment( festivo, constantes.FORMATO_FECHA );
        const rangoFechas = moment( momFestivo ).isBetween( momFechaInicio, momFechaFin, undefined, '[]' );

        // Día festivo/alta está entre la fecha.
        if( rangoFechas ) {
          diasAlta++;
        }
      });
    }
    
    // Cálculo días de baja
    diasBaja = ( diasTotales - diasAlta );

    // Cálculo totales por temporada
    totalAlta = ( diasAlta * categoriaUsuarios.valorAlta );
    totalBaja = ( diasBaja * categoriaUsuarios.valorBaja );
    totalIndividual = ( totalAlta + totalBaja );
  
    return {    
      // Días
      diasBaja,
      diasAlta,
      diasTotales,
      
      // Totales
      totalBaja,
      totalAlta,
      totalIndividual,
      totalGrupo      : ( totalIndividual * this.#personas ),

      // Fechas
      fechaDeInicio   : momFechaInicio.format( constantes.FORMATO_FECHA ),
      fechaDeFin      : momFechaFin.format( constantes.FORMATO_FECHA ),
    };
  }
}
