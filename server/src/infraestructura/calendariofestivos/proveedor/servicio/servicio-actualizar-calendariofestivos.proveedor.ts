import { RepositorioCalendarioFestivos } from 'src/dominio/calendariofestivos/puerto/repositorio/repositorio-calendariofestivos';
import { ServicioActualizarCalendarioFestivos } from 'src/dominio/calendariofestivos/servicio/servicio-actualizar-calendariofestivos';

export function servicioActualizarCalendarioFestivosProveedor( 
    repositorioCalendarioFestivos: RepositorioCalendarioFestivos ) {
    return new ServicioActualizarCalendarioFestivos( repositorioCalendarioFestivos );
}
