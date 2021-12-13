import { Repository, In } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CategoriaUsuarios } from 'src/dominio/categoriausuarios/modelo/categoriausuarios';
import { CategoriaUsuariosEntidad } from 'src/infraestructura/categoriausuarios/entidad/categoriausuarios.entidad';
import { RepositorioCategoriaUsuarios } from 'src/dominio/categoriausuarios/puerto/repositorio/repositorio-categoriausuarios';
@Injectable()
export class RepositorioCategoriaUsuariosMysql implements RepositorioCategoriaUsuarios {
    
    constructor(
        @InjectRepository( CategoriaUsuariosEntidad )
        private readonly repositorio: Repository<CategoriaUsuariosEntidad>,
    ) {}

    /**
     * Guardar Repositorio
     * @param {CategoriaUsuarios} categoriaUsuarios
     */
    async guardar( categoriaUsuarios: CategoriaUsuarios ): Promise<void> {

        const entidad = new CategoriaUsuariosEntidad();

        entidad.nombre = categoriaUsuarios.nombre;
        entidad.descripcion = categoriaUsuarios.descripcion;
        entidad.valorAlta = categoriaUsuarios.valorAlta;
        entidad.valorBaja = categoriaUsuarios.valorBaja;
        
        await this.repositorio.save( entidad );
    }

    /**
     * Helper validarCategorias
     * @param {CategoriaUsuariosEntidad[]} categoriaUsuarios
     */
    async validarCategorias( categoriasUsuariosId: CategoriaUsuariosEntidad[]): Promise<[CategoriaUsuariosEntidad[], number]> {
        const resultado = await this.repositorio.findAndCount({
            where: { id: In( categoriasUsuariosId ) },
        });
        return resultado;
    }

    /**
     * Helper existeCategoriaUsuarios
     * @param {number} categoriasUsuarioId
     */
    async existeCategoriaUsuarios( categoriasUsuarioId: number): Promise<[CategoriaUsuariosEntidad[], number]> {
        const resultado = await this.repositorio.findAndCount({
            where: { id: categoriasUsuarioId }
        });
        return resultado;
    }

    /**
     * Helper obtenerUnaCategoriaUsuarios
     * @param {number} categoriasUsuarioId
     */
    async obtenerUnaCategoriaUsuarios( categoriasUsuarioId: number): Promise<CategoriaUsuariosEntidad> {
        const resultado = await this.repositorio.findOne( categoriasUsuarioId );
        return resultado;
    }
}
