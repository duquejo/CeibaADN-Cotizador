import * as moment from 'moment';
import { CategoriaUsuarios } from 'src/dominio/categoriausuarios/modelo/categoriausuarios';
import { CalendarioFestivos } from 'src/dominio/calendariofestivos/modelo/calendariofestivos';
import { CentroVacacional } from 'src/dominio/centrovacacional/modelo/centrovacacional';

/**
 * 
 * Test Builder Pattern
 * 
 */
export class CalendarioFestivosBuilder {
    private _nombre: string;
    private _descripcion = '';
    private _festivos: string[] = [];
  
    constructor(nombre: string ) {
      this._nombre = nombre;
    }

    setNombre( nombre: string ): CalendarioFestivosBuilder {
        this._nombre = nombre; 
        return this;
    }

    setDescripcion( descripcion: string ): CalendarioFestivosBuilder{
        this._descripcion = descripcion; 
        return this;
    }

    setFestivos( festivos: string[] ): CalendarioFestivosBuilder {
        this._festivos = festivos; 
        return this;
    }

    /**
     * Retorna los festivos en formato moment
     * @returns 
     */
    setFestivosMoment(): CalendarioFestivosBuilder {
        this._festivos = this._festivos.map( ( festivo: string ) => moment( festivo ).format() );
        return this;
    }

    /**
     * Construye un objeto del tipo CalendarioFestivos
     * @returns {CalendarioFestivos}
     */
    build(): CalendarioFestivos {
        return new CalendarioFestivos(
            this._nombre,
            this._descripcion,
            this._festivos 
        );
    }

    get nombre() {
        return this._nombre; 
    }

    get descripcion() {
        return this._descripcion; 
    }

    get festivos() {
        return this._festivos; 
    }
}

export class CategoriaUsuariosBuilder {
    private _nombre: string;
    private _descripcion: string = '';
    private _valorAlta = 0;
    private _valorBaja = 0;

    constructor( nombre: string, valorAlta: number, valorBaja: number ) {
        this._nombre = nombre;
        this._valorAlta = valorAlta;
        this._valorBaja = valorBaja;
    }

    setNombre( nombre: string ): CategoriaUsuariosBuilder {
        this._nombre = nombre; 
        return this;
    }

    setDescripcion( descripcion: string ): CategoriaUsuariosBuilder {
        this._descripcion = descripcion;
        return this;
    }

    setValorAlta( valorAlta: number ): CategoriaUsuariosBuilder {
        this._valorAlta = valorAlta; 
        return this;
    }

    setValorBaja( valorBaja: number ): CategoriaUsuariosBuilder {
        this._valorBaja = valorBaja; 
        return this;
    }

    /**
     * Construye un objeto del tipo CalendarioFestivos
     * @returns {CategoriaUsuarios}
     */
    build(): CategoriaUsuarios {
        return new CategoriaUsuarios(
            this._nombre,
            this._descripcion,
            this._valorAlta,
            this._valorBaja,
        );
    }

    get nombre() {
        return this._nombre; 
    }

    get descripcion() {
        return this._descripcion; 
    }

    get valorAlta() {
        return this._valorAlta; 
    }    

    get valorBaja() {
        return this._valorBaja; 
    }
}

export class CentroVacacionalBuilder {
    private _nombre: string;
    private _descripcion: string = '';
    private _calendarioActivo?: number = null;
    private _calendarios: number[] = [];
    private _categoriasUsuarios: number[] = [];

    constructor( nombre: string ) {
        this._nombre = nombre;
    }

    setNombre( nombre: string ): CentroVacacionalBuilder {
        this._nombre = nombre; 
        return this;
    }

    setDescripcion( descripcion: string ): CentroVacacionalBuilder {
        this._descripcion = descripcion;
        return this;
    }

    setCalendarioActivo( calendarioActivo: number ): CentroVacacionalBuilder {
        this._calendarioActivo = calendarioActivo; 
        return this;
    }

    setCalendarios( calendarios: number[] ): CentroVacacionalBuilder {
        this._calendarios = calendarios; 
        return this;
    }

    setCategoriasUsuarios( categoriasUsuarios: number[] ): CentroVacacionalBuilder {
        this._categoriasUsuarios = categoriasUsuarios; 
        return this;
    }

    /**
     * Construye un objeto del tipo CentroVacacional
     * @returns {CentroVacacional}
     */
    build(): CentroVacacional {
        return new CentroVacacional(
            this._nombre,
            this._descripcion,
            this._calendarios,
            this._categoriasUsuarios,
            this._calendarioActivo
        );
    }

    get nombre() {
        return this._nombre; 
    }

    get descripcion() {
        return this._descripcion; 
    }

    get calendarioActivo() {
        return this._calendarioActivo; 
    }

    get calendarios() {
        return this._calendarios; 
    }

    get categoriasUsuarios() {
        return this._categoriasUsuarios; 
    }
}