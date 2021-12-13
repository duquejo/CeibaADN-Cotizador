import { getConnection, In, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Cotizacion } from 'src/dominio/cotizacion/modelo/cotizacion';
import { ICotizacion } from 'src/dominio/cotizacion/modelo/interface.cotizacion';
import { CotizacionEntidad } from 'src/infraestructura/cotizacion/entidad/cotizacion.entidad';

import { RepositorioCotizacion } from 'src/dominio/cotizacion/puerto/repositorio/repositorio-cotizacion';
import { CentroVacacionalEntidad } from 'src/infraestructura/centrovacacional/entidad/centrovacacional.entidad';
import { CategoriaUsuariosEntidad } from 'src/infraestructura/categoriausuarios/entidad/categoriausuarios.entidad';

@Injectable()
export class RepositorioCotizacionMysql implements RepositorioCotizacion {
    
    constructor(
        @InjectRepository( CotizacionEntidad )
        private readonly repositorio: Repository<CotizacionEntidad>,
    ) {}

    /**
     * Guardar Repositorio
     * @param {Cotizacion} Cotizacion
     */
    async crear( cotizacion: Cotizacion, totalCotizacion: ICotizacion ): Promise<void> {

        const entidad = new CotizacionEntidad();

        entidad.centroVacacional = cotizacion.centroVacacional as CentroVacacionalEntidad;
        entidad.categoriaUsuarios = cotizacion.categoriaUsuarios as CategoriaUsuariosEntidad;
        entidad.personas = cotizacion.personas;
        entidad.fechaInicio = cotizacion.fechaInicio;
        entidad.fechaFin = cotizacion.fechaFin;
        entidad.total = totalCotizacion.totalGrupo;
        
        await this.repositorio.save( entidad );
    }
}