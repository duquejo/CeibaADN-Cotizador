import { DaoCentroVacacional } from 'src/dominio/centrovacacional/puerto/dao/dao-centrovacacional';
import { DaoCentroVacacionalMysql } from 'src/infraestructura/centrovacacional/adaptador/dao/dao-centrovacacional-mysql';

export const daoCentroVacacionalProvider = {
  provide: DaoCentroVacacional,
  useClass: DaoCentroVacacionalMysql,
};
