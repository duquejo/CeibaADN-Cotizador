import { RepositorioCalendarioFestivos } from 'src/dominio/calendariofestivos/puerto/repositorio/repositorio-calendariofestivos';
import { ServicioBorrarCalendarioFestivos } from 'src/dominio/calendariofestivos/servicio/servicio-borrar-calendariofestivos';

export function servicioBorrarCalendarioFestivosProveedor( 
    repositorioCalendarioFestivos: RepositorioCalendarioFestivos ) {
    return new ServicioBorrarCalendarioFestivos( repositorioCalendarioFestivos );
}