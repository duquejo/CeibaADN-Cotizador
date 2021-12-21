import { CalendarioFestivos } from '../../src/dominio/calendariofestivos/modelo/calendariofestivos';

/**
 * Test Builder Pattern
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

    build() : CalendarioFestivos {
        return new CalendarioFestivos( this._nombre, this._descripcion, this._festivos );
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