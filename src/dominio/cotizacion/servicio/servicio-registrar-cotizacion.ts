import { NotFoundException } from '@nestjs/common';

import { Cotizacion } from 'src/dominio/cotizacion/modelo/cotizacion';
import { ICotizacion } from 'src/dominio/cotizacion/modelo/interface.cotizacion';

import { RepositorioCotizacion } from 'src/dominio/cotizacion/puerto/repositorio/repositorio-cotizacion';
import { RepositorioCentroVacacional } from 'src/dominio/centrovacacional/puerto/repositorio/repositorio-centrovacacional';
import { RepositorioCategoriaUsuarios } from 'src/dominio/categoriausuarios/puerto/repositorio/repositorio-categoriausuarios';

import { CentroVacacionalEntidad } from 'src/infraestructura/centrovacacional/entidad/centrovacacional.entidad';
import { CategoriaUsuariosEntidad } from 'src/infraestructura/categoriausuarios/entidad/categoriausuarios.entidad';
export class ServicioCrearCotizacion {

    constructor(
        private readonly _repositorioCotizador: RepositorioCotizacion,
        private readonly _repositorioCentroVacacional: RepositorioCentroVacacional,
        private readonly _repositorioCategoriaUsuarios  : RepositorioCategoriaUsuarios
    ) {}

    async ejecutar( cotizacion: Cotizacion ): Promise<void> {
        
        // Validar existencia centro vacacional
        const centroVacacional = await this._repositorioCentroVacacional.obtenerUnCentroVacacional( cotizacion.centroVacacional as number );
        if( ! centroVacacional )
            throw new NotFoundException( `El centro vacacional {${ cotizacion.centroVacacional }} no existe` );
            
        // Validar existencia categoria usuarios
        const categoriaUsuarios = await this._repositorioCategoriaUsuarios.obtenerUnaCategoriaUsuarios( cotizacion.categoriaUsuarios as number );
        if( ! categoriaUsuarios )
            throw new NotFoundException( `La categoría de usuarios {${ cotizacion.categoriaUsuarios }} no existe` );
        
        /**
         * Valores actualizados.
         */
        cotizacion.centroVacacional = centroVacacional as CentroVacacionalEntidad;
        cotizacion.categoriaUsuarios = categoriaUsuarios as CategoriaUsuariosEntidad;

        /**
         * Calcular cotización
         */
        const totalCotizacion: ICotizacion = cotizacion.calcularCotizacion(
            cotizacion.centroVacacional,
            cotizacion.categoriaUsuarios
        );
        
        // Guardar
        await this._repositorioCotizador.crear( cotizacion, totalCotizacion );
    }
}