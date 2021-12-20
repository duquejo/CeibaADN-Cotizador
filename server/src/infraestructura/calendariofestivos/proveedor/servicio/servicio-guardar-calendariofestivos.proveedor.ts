import { RepositorioCalendarioFestivos } from 'src/dominio/calendariofestivos/puerto/repositorio/repositorio-calendariofestivos';
import { ServicioGuardarCalendarioFestivos } from 'src/dominio/calendariofestivos/servicio/servicio-guardar-calendariofestivos';

export function servicioGuardarCalendarioFestivosProveedor( 
    repositorioCalendarioFestivos: RepositorioCalendarioFestivos ) {
    return new ServicioGuardarCalendarioFestivos( repositorioCalendarioFestivos );
}
