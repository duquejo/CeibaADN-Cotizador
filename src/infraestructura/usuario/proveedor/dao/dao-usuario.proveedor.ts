import { DaoUsuario } from 'src/dominio/usuario/puerto/dao/dao-usuario';
import { DaoUsuarioMysql } from 'src/infraestructura/usuario/adaptador/dao/dao-usuario-mysql';

export const daoUsuarioProvider = {
  provide: DaoUsuario,
  useClass: DaoUsuarioMysql,
};
