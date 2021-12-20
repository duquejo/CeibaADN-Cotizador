import { DaoCotizacion } from 'src/dominio/cotizacion/puerto/dao/dao-cotizacion';
import { DaoCotizacionMysql } from 'src/infraestructura/cotizacion/adaptador/dao/dao-cotizacion-mysql';

export const daoCotizacionProvider = {
  provide: DaoCotizacion,
  useClass: DaoCotizacionMysql,
};
