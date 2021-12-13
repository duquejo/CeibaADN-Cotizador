import { NotFoundException, UnprocessableEntityException } from '@nestjs/common';

import { CentroVacacional } from 'src/dominio/centrovacacional/modelo/centrovacacional';

import { RepositorioCentroVacacional } from 'src/dominio/centrovacacional/puerto/repositorio/repositorio-centrovacacional';
import { RepositorioCategoriaUsuarios } from 'src/dominio/categoriausuarios/puerto/repositorio/repositorio-categoriausuarios';
import { RepositorioCalendarioFestivos } from 'src/dominio/calendariofestivos/puerto/repositorio/repositorio-calendariofestivos';

import { CategoriaUsuariosEntidad } from 'src/infraestructura/categoriausuarios/entidad/categoriausuarios.entidad';
import { CalendarioFestivosEntidad } from 'src/infraestructura/calendariofestivos/entidad/calendariofestivos.entidad';
export class ServicioActualizarCentroVacacional {

    constructor(
        private readonly _repositorioCentroVacacional   : RepositorioCentroVacacional,
        private readonly _repositorioCategoriaUsuarios  : RepositorioCategoriaUsuarios,        
        private readonly _repositorioCalendarioFestivos : RepositorioCalendarioFestivos
    ) {}

    async ejecutar( centroVacacionalId: number, centroVacacional: CentroVacacional ): Promise<void> {

        // Validar existencia
        const [ centroVacacionalObjeto, resultados] = await this._repositorioCentroVacacional.existeCentroVacacional( centroVacacionalId );
        if( resultados === 0 && ! centroVacacionalObjeto ) {
            throw new NotFoundException( `El centro vacacional {${ centroVacacionalId }} no existe` );
        }

        /**
         * Validar existencia de Calendarios Festivos
         */
         if( centroVacacional.calendarios ) {

            /**
             * Validar ID y obtener calendarios
             */            
            const [ resCalendarios, numCalendarios ]: [ CalendarioFestivosEntidad[], number] = await this._repositorioCalendarioFestivos
                .validarCalendarios( centroVacacional.calendarios );

            if( numCalendarios === 0 && ! resCalendarios ) {
                throw new UnprocessableEntityException( `Los calendarios a modificar deben existir` );
            }
            
            // Asignación calendarios
            centroVacacional.calendarios = resCalendarios;

            // Validar existencia de calendario activo en calendarios
            if ( ! resCalendarios.some( calendario => calendario.id === centroVacacional.calendarioActivo ) ) {
                centroVacacional.calendarioActivo = resCalendarios[0]?.id ? resCalendarios[0].id : null;
            }
        } else {
            centroVacacional.calendarioActivo = null;
        }

        /**
         * Validar existencia de Categorías de usuarios
         */
         if( centroVacacional.categoriasUsuarios ) {

            /**
             * Validar ID y obtener categorías
             */
            const [ resCategorias, numCategorias ]: [ CategoriaUsuariosEntidad[], number] = await this._repositorioCategoriaUsuarios
                .validarCategorias( centroVacacional.categoriasUsuarios );
            
            if( numCategorias === 0 && ! resCategorias ) {
                throw new UnprocessableEntityException( `Las categorías a vincular deben existir` );
            }
            
            // Asignación categorías
            centroVacacional.categoriasUsuarios = resCategorias;
        } else {
            centroVacacional.categoriasUsuarios = null;
        }

        // Guardar
        await this._repositorioCentroVacacional.actualizar( centroVacacionalId, centroVacacional );
    }
}
