import { RepositorioCategoriaUsuarios } from 'src/dominio/categoriausuarios/puerto/repositorio/repositorio-categoriausuarios';
import { RepositorioCategoriaUsuariosMysql } from 'src/infraestructura/categoriausuarios/adaptador/repositorio/repositorio-categoriausuarios-mysql';

export const repositorioCategoriaUsuariosProvider = {
    provide: RepositorioCategoriaUsuarios,
    useClass: RepositorioCategoriaUsuariosMysql
};