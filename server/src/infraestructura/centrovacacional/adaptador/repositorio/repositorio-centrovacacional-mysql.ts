import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CentroVacacional } from 'src/dominio/centrovacacional/modelo/centrovacacional';
import { CentroVacacionalEntidad } from 'src/infraestructura/centrovacacional/entidad/centrovacacional.entidad';
import { RepositorioCentroVacacional } from 'src/dominio/centrovacacional/puerto/repositorio/repositorio-centrovacacional';
@Injectable()
export class RepositorioCentroVacacionalMysql implements RepositorioCentroVacacional {
    
    constructor(
        @InjectRepository( CentroVacacionalEntidad )
        private readonly repositorio: Repository<CentroVacacionalEntidad>,
    ) {}

    /**
     * Guardar Repositorio
     * @param {CentroVacacional} centroVacacional
     */
    async guardar( centroVacacional: CentroVacacional ): Promise<CentroVacacionalEntidad> {

        const entidad = new CentroVacacionalEntidad();

        entidad.nombre            = centroVacacional.nombre;
        entidad.descripcion       = centroVacacional.descripcion;
        entidad.calendarios       = centroVacacional.calendarios;
        entidad.calendarioActivo  = centroVacacional.calendarioActivo;
        entidad.categoriaUsuarios = centroVacacional.categoriasUsuarios;

        return this.repositorio.save(entidad);
    }

    /** 
     * Actualizar Repositorio
     * @param {CentroVacacional} centroVacacional 
     * @param {number} centroVacacionalId
     */    
    async actualizar( centroVacacionalId: number, centroVacacional: CentroVacacional ): Promise<void> {

        const entidadActual = await this.repositorio.findOne( centroVacacionalId );
        
        entidadActual.nombre            = centroVacacional.nombre;
        entidadActual.descripcion       = centroVacacional.descripcion;
        entidadActual.calendarios       = centroVacacional.calendarios;
        entidadActual.calendarioActivo  = centroVacacional.calendarioActivo;
        entidadActual.categoriaUsuarios = centroVacacional.categoriasUsuarios;
        
        await this.repositorio.save( entidadActual );
    }

    /**
     * Borrar Repositorio
     * @param {CentroVacacional} centroVacacionalId
     */
    async borrar( centroVacacionalId: number ): Promise<void> {
        await this.repositorio.delete( centroVacacionalId );
    }

    /**
     * Helper existeCentroVacacional
     * @param {number} centroVacacionalId
     */
     async existeCentroVacacional( centroVacacionalId: number ): Promise<[CentroVacacionalEntidad[], number]> {
        return this.repositorio.findAndCount({
            where: { id: centroVacacionalId } }
        );
    }    

    /**
     * Helper obtenerUnCentroVacacional
     * @param {number} centroVacacionalId
     */
     async obtenerUnCentroVacacional( centroVacacionalId: number ): Promise<CentroVacacionalEntidad> {
        return this.repositorio.findOne( centroVacacionalId );        
    }

    /**
     * Helper existeNombreCentroVacacional
     * @param {string} nombre 
     * @returns boolean
     */
     async existeNombreCentroVacacional (nombre: string ): Promise<boolean> {
        return ( ( await this.repositorio.count({ nombre }) ) > 0 );
    }
}
