import { RepositorioCategoriaUsuarios } from 'src/dominio/categoriausuarios/puerto/repositorio/repositorio-categoriausuarios';
import { ServicioGuardarCategoriaUsuarios } from 'src/dominio/categoriausuarios/servicio/servicio-guardar-categoriausuarios';

export function servicioGuardarCategoriaUsuariosProveedor( 
    repositorioCategoriaUsuarios: RepositorioCategoriaUsuarios
    ) {
    return new ServicioGuardarCategoriaUsuarios( repositorioCategoriaUsuarios );
}