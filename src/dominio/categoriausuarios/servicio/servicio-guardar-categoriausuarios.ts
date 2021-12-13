import { CategoriaUsuarios } from 'src/dominio/categoriausuarios/modelo/categoriausuarios';
import { RepositorioCategoriaUsuarios } from 'src/dominio/categoriausuarios/puerto/repositorio/repositorio-categoriausuarios';

export class ServicioGuardarCategoriaUsuarios {

    constructor(
        private readonly _repositorioCategoriaUsuarios: RepositorioCategoriaUsuarios
    ) {}

    async ejecutar( categoriaUsuarios: CategoriaUsuarios ) {
        await this._repositorioCategoriaUsuarios.guardar( categoriaUsuarios );
    }
}
