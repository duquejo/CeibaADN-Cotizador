import { Usuario } from 'src/dominio/usuario/modelo/usuario';

export abstract class RepositorioUsuario {
  abstract async existeNombreUsuario(nombre: string): Promise<boolean>;
  abstract async guardar(usuario: Usuario);
}
