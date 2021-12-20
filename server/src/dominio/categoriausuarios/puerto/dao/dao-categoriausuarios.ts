import { CategoriaUsuariosDto } from 'src/aplicacion/categoriausuarios/consulta/dto/categoriausuarios.dto';

export abstract class DaoCategoriaUsuarios {

  /**
   * Read OP
   */
  abstract obtenerCategoriaUsuarios(): Promise<CategoriaUsuariosDto[]>;
}
