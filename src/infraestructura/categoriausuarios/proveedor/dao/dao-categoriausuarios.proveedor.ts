import { DaoCategoriaUsuarios } from 'src/dominio/categoriausuarios/puerto/dao/dao-categoriausuarios';
import { DaoCategoriaUsuariosMysql } from 'src/infraestructura/categoriausuarios/adaptador/dao/dao-categoriausuarios-mysql';

export const daoCategoriaUsuariosProvider = {
  provide: DaoCategoriaUsuarios,
  useClass: DaoCategoriaUsuariosMysql,
};
