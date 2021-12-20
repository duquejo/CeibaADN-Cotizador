import { RepositorioCentroVacacional } from 'src/dominio/centrovacacional/puerto/repositorio/repositorio-centrovacacional';
import { RepositorioCategoriaUsuarios } from 'src/dominio/categoriausuarios/puerto/repositorio/repositorio-categoriausuarios';
import { RepositorioCalendarioFestivos } from 'src/dominio/calendariofestivos/puerto/repositorio/repositorio-calendariofestivos';

import { ServicioActualizarCentroVacacional } from 'src/dominio/centrovacacional/servicio/servicio-actualizar-centrovacacional';

export function servicioActualizarCentroVacacionalProveedor( 
        repositorioCentroVacacional: RepositorioCentroVacacional,
        repositorioCalendarioFestivos: RepositorioCalendarioFestivos,
        repositorioCategoriaUsuarios: RepositorioCategoriaUsuarios
    ) {
    return new ServicioActualizarCentroVacacional( 
        repositorioCentroVacacional, 
        repositorioCategoriaUsuarios,
        repositorioCalendarioFestivos
    );
}
