import { BadRequestException, UnprocessableEntityException } from '@nestjs/common';

import { CentroVacacional } from 'src/dominio/centrovacacional/modelo/centrovacacional';

import { RepositorioCentroVacacional } from 'src/dominio/centrovacacional/puerto/repositorio/repositorio-centrovacacional';
import { RepositorioCategoriaUsuarios } from 'src/dominio/categoriausuarios/puerto/repositorio/repositorio-categoriausuarios';
import { RepositorioCalendarioFestivos } from 'src/dominio/calendariofestivos/puerto/repositorio/repositorio-calendariofestivos';

import { CategoriaUsuariosEntidad } from 'src/infraestructura/categoriausuarios/entidad/categoriausuarios.entidad';
import { CalendarioFestivosEntidad } from 'src/infraestructura/calendariofestivos/entidad/calendariofestivos.entidad';
export class ServicioGuardarCentroVacacional {

    constructor(
        private readonly _repositorioCentroVacacional   : RepositorioCentroVacacional,
        private readonly _repositorioCategoriaUsuarios  : RepositorioCategoriaUsuarios,
        private readonly _repositorioCalendarioFestivos : RepositorioCalendarioFestivos
    ) {}

    async ejecutar( centroVacacional: CentroVacacional ) {

        if ( await this._repositorioCentroVacacional.existeNombreCentroVacacional( centroVacacional.nombre ) )
            throw new BadRequestException( `El nombre del centro vacacional {${centroVacacional.nombre}} ya existe, ingresa otro.` );

        /**
         * Validar existencia de Calendarios Festivos
         */
        if( centroVacacional.calendarios ) {

            const [ calendariosExistentes, resultadosCalendarios ]: [ CalendarioFestivosEntidad[], number] = await this._repositorioCalendarioFestivos.validarCalendarios( centroVacacional.calendarios );

            if( resultadosCalendarios === 0 ) throw new UnprocessableEntityException( `Los calendarios a guardar deben existir` );
            
            // Asignación calendarios
            centroVacacional.calendarios = calendariosExistentes;

            // Validar existencia de calendario activo en calendarios
            if ( ! calendariosExistentes.some( calendario => calendario.id === centroVacacional.calendarioActivo ) )
                centroVacacional.calendarioActivo = calendariosExistentes[0]?.id ? calendariosExistentes[0].id : null;
                
        } else {
            centroVacacional.calendarioActivo = null;
        }

        /**
         * Validar existencia de Categorías de usuarios
         */
        if( centroVacacional.categoriasUsuarios ) {

            const [ categoriasExistentes, resultadosCategorias ]: [ CategoriaUsuariosEntidad[], number] = await this._repositorioCategoriaUsuarios.validarCategorias( centroVacacional.categoriasUsuarios );
            
            if( resultadosCategorias === 0 ) throw new UnprocessableEntityException( `Las categorías a vincular deben existir` );
            
            // Asignación categorías
            centroVacacional.categoriasUsuarios = categoriasExistentes;
        } else {
            centroVacacional.categoriasUsuarios = null;
        }

        // Guardar
        await this._repositorioCentroVacacional.guardar( centroVacacional );
    }
}