import { RepositorioCategoriaUsuarios } from '../../../../dominio/categoriausuarios/puerto/repositorio/repositorio-categoriausuarios';
import { ServicioBorrarCategoriaUsuarios } from '../../../../dominio/categoriausuarios/servicio/servicio-borrar-categoriausuarios';

export function servicioBorrarCategoriaUsuariosProveedor( 
    repositorioCategoriaUsuarios: RepositorioCategoriaUsuarios ) {
    return new ServicioBorrarCategoriaUsuarios( repositorioCategoriaUsuarios );
}
