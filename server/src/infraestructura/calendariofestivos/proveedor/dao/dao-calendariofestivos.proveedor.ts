import { DaoCalendarioFestivos } from 'src/dominio/calendariofestivos/puerto/dao/dao-calendariofestivos';
import { DaoCalendarioFestivosMysql } from 'src/infraestructura/calendariofestivos/adaptador/dao/dao-calendariofestivos-mysql';

export const daoCalendarioFestivosProvider = {
  provide: DaoCalendarioFestivos,
  useClass: DaoCalendarioFestivosMysql,
};
