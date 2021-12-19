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
        const [, resultados] = ( await this._repositorioCentroVacacional.existeCentroVacacional( centroVacacionalId ) );
        if( resultados === 0 ) {
            throw new NotFoundException( `El centro vacacional {${ centroVacacionalId }} no existe` );
        }

        /**
         * Validar existencia de Categorías
         */
         if( centroVacacional.categoriasUsuarios && centroVacacional.categoriasUsuarios.length ) {

            /**
             * Validar ID y obtener categorías
             */
            const [ resCat, numCat ]: [ CategoriaUsuariosEntidad[], number] = ( 
                await this._repositorioCategoriaUsuarios.validarCategorias( centroVacacional.categoriasUsuarios ) 
            );
            
            if( numCat === 0 ) {
                throw new UnprocessableEntityException( `Las categorías a vincular deben existir` );
            }
            
            // Asignación categorías
            centroVacacional.categoriasUsuarios = resCat;
        } else {
            centroVacacional.categoriasUsuarios = null;
        }

        /**
         * Validar existencia de Calendarios
         */
         if( centroVacacional.calendarios && centroVacacional.calendarios.length ) {

            /**
             * Validar ID y obtener calendarios
             */            
            const [ resCal, numCal ]: [ CalendarioFestivosEntidad[], number] = (
                await this._repositorioCalendarioFestivos.validarCalendarios( centroVacacional.calendarios )
            );

            if( numCal === 0 ) {
                throw new UnprocessableEntityException( `Los calendarios a modificar deben existir` );
            }
            
            // Asignación calendarios
            centroVacacional.calendarios = resCal;

            // Validar existencia de calendario activo en calendarios
            if ( ! resCal.some( calendario => calendario.id === centroVacacional.calendarioActivo ) ) {
                centroVacacional.calendarioActivo = resCal[0]?.id ? resCal[0].id : null;
            }
        } else {
            centroVacacional.calendarioActivo = null;
        }

        // Guardar
        await this._repositorioCentroVacacional.actualizar( centroVacacionalId, centroVacacional );
    }
}
