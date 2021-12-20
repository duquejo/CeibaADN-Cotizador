import { RepositorioCalendarioFestivos } from 'src/dominio/calendariofestivos/puerto/repositorio/repositorio-calendariofestivos';
import { RepositorioCalendarioFestivosMysql } from 'src/infraestructura/calendariofestivos/adaptador/repositorio/repositorio-calendariofestivos-mysql';

export const repositorioCalendarioFestivosProvider = {
    provide: RepositorioCalendarioFestivos,
    useClass: RepositorioCalendarioFestivosMysql,
};
