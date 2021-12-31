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
    async guardar( categoriaUsuarios: CategoriaUsuarios ): Promise<CategoriaUsuariosEntidad> {

        const entidad = new CategoriaUsuariosEntidad();

        entidad.nombre = categoriaUsuarios.nombre;
        entidad.descripcion = categoriaUsuarios.descripcion;
        entidad.valorAlta = categoriaUsuarios.valorAlta;
        entidad.valorBaja = categoriaUsuarios.valorBaja;
        
        return this.repositorio.save( entidad );
    }

    /**
     * Helper validarCategorias
     * @param {CategoriaUsuariosEntidad[]} categoriaUsuarios
     */
    async validarCategorias( categoriasUsuariosId: CategoriaUsuariosEntidad[]): Promise<[CategoriaUsuariosEntidad[], number]> {
        return this.repositorio.findAndCount({
            where: { id: In( categoriasUsuariosId ) },
        });
    }

    /**
     * Helper existeCategoriaUsuarios
     * @param {number} categoriasUsuarioId
     */
    async existeCategoriaUsuarios( categoriasUsuarioId: number): Promise<boolean> {
        return await this.repositorio.findOne( categoriasUsuarioId ) ? true : false;
    }

    /**
     * Helper obtenerUnaCategoriaUsuarios
     * @param {number} categoriasUsuarioId
     */
    async obtenerUnaCategoriaUsuarios( categoriasUsuarioId: number): Promise<CategoriaUsuariosEntidad> {
        return this.repositorio.findOne( categoriasUsuarioId );
    }

    /**
     * Borrar Categoria
     * @param {number} categoriaId
     */
     async borrar( categoriaId: number ): Promise<void> {
        await this.repositorio.delete( categoriaId );
    }

}
