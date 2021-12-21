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

        if ( await this._repositorioCentroVacacional.existeNombreCentroVacacional( centroVacacional.nombre ) ) {
            throw new BadRequestException( `El nombre del centro vacacional {${centroVacacional.nombre}} ya existe, ingresa otro.` );
        }

        /**
         * Validar existencia de Calendarios Festivos
         */
        if( centroVacacional.calendarios?.length ) {

            /**
             * Validar ID y obtener calendarios
             */             
            const [ resCalendarios, numCalendarios ]: [ CalendarioFestivosEntidad[], number] = (
                await this._repositorioCalendarioFestivos.validarCalendarios( centroVacacional.calendarios )
            );

            if( numCalendarios === 0 ) {
                throw new UnprocessableEntityException( `Los calendarios a guardar deben existir` );
            }
            
            // Asignación calendarios
            centroVacacional.calendarios = resCalendarios;

            // Validar existencia de calendario activo en calendarios
            if ( ! resCalendarios.some( calendario => calendario.id === centroVacacional.calendarioActivo ) ) {
                centroVacacional.calendarioActivo = resCalendarios[0]?.id ? resCalendarios[0].id : null;
            }
        }   

        /**
         * Validar existencia de Categorías de usuarios
         */
        if( centroVacacional.categoriasUsuarios?.length ) {

            /**
             * Validar ID y obtener categorías
             */                
            const [resCategorias,numCategorias]: [ CategoriaUsuariosEntidad[], number] = (
                await this._repositorioCategoriaUsuarios.validarCategorias( centroVacacional.categoriasUsuarios )
            );
            
            if( numCategorias === 0 ) {
                throw new UnprocessableEntityException( `Las categorías a vincular deben existir` );
            }
            
            // Asignación categorías
            centroVacacional.categoriasUsuarios = resCategorias;
        }           

        // Guardar
        return this._repositorioCentroVacacional.guardar( centroVacacional );
    }
}
