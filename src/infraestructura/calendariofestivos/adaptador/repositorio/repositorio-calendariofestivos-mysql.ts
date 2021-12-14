import { Repository, In } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CalendarioFestivosEntidad } from 'src/infraestructura/calendariofestivos/entidad/calendariofestivos.entidad';
import { RepositorioCalendarioFestivos } from 'src/dominio/calendariofestivos/puerto/repositorio/repositorio-calendariofestivos';
import { CalendarioFestivos } from 'src/dominio/calendariofestivos/modelo/calendariofestivos';
@Injectable()
export class RepositorioCalendarioFestivosMysql implements RepositorioCalendarioFestivos {
    
    constructor(
        @InjectRepository( CalendarioFestivosEntidad )
        private readonly repositorio: Repository<CalendarioFestivosEntidad>
    ) {}

    /**
     * Guardar Repositorio
     * @param {CalendarioFestivos} calendarioFestivos
     */
    async guardar( calendarioFestivos: CalendarioFestivos ): Promise<void> {

        const entidad = new CalendarioFestivosEntidad();

        entidad.nombre = calendarioFestivos.nombre;
        entidad.descripcion = calendarioFestivos.descripcion;
        entidad.festivos = calendarioFestivos.festivos;

        await this.repositorio.save(entidad);
    }

    /** 
     * Actualizar Repositorio
     * @param {CalendarioFestivos} calendarioFestivos 
     * @param {number} calendarioId
     */    
    async actualizar( calendarioId: number, calendarioFestivos: CalendarioFestivos ): Promise<void> {

        const entidadActual = await this.repositorio.findOne( calendarioId );
        
        entidadActual.nombre = calendarioFestivos.nombre;
        entidadActual.descripcion = calendarioFestivos.descripcion;
        entidadActual.festivos = calendarioFestivos.festivos;
        
        await this.repositorio.update( calendarioId, entidadActual );
    }

    /**
     * Borrar Repositorio
     * @param {CalendarioFestivos} calendarioId
     */
    async borrar( calendarioId: number ): Promise<void> {
        await this.repositorio.delete( calendarioId );
    }

    /**
     * Helper existeCalendario
     * @param {number} calendarioId
     */
    async existeCalendario( calendarioId: number ): Promise<boolean> {
        return await this.repositorio.findOne( calendarioId ) ? true : false;
    }

    /**
     * Helper validarCalendarios
     * @param {CalendarioFestivosEntidad[]} calendariosIds
     */
    async validarCalendarios( calendariosIds: CalendarioFestivosEntidad[] ): Promise<[ CalendarioFestivosEntidad[], number]> {
        return this.repositorio.findAndCount({
            where: { id: In( calendariosIds ) },
        });
    }
}
