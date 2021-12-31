import { NotFoundException } from '@nestjs/common';
import { RepositorioCategoriaUsuarios } from '../puerto/repositorio/repositorio-categoriausuarios';

export class ServicioBorrarCategoriaUsuarios {

    constructor(
        private readonly _repositorioCategoriaUsuarios: RepositorioCategoriaUsuarios
    ) {}

    async ejecutar( categoriaId: number ): Promise<void> {
        // Validar existencia
        if( ! await this._repositorioCategoriaUsuarios.existeCategoriaUsuarios( categoriaId )  ){
            throw new NotFoundException( `La categoría de usuarios {${ categoriaId }} no existe` );
        }
        await this._repositorioCategoriaUsuarios.borrar( categoriaId );
    }
}
