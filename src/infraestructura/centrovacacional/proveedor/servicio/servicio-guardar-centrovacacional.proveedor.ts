import { ServicioGuardarCentroVacacional } from 'src/dominio/centrovacacional/servicio/servicio-guardar-centrovacacional';

import { RepositorioCentroVacacional } from 'src/dominio/centrovacacional/puerto/repositorio/repositorio-centrovacacional';
import { RepositorioCategoriaUsuarios } from 'src/dominio/categoriausuarios/puerto/repositorio/repositorio-categoriausuarios';
import { RepositorioCalendarioFestivos } from 'src/dominio/calendariofestivos/puerto/repositorio/repositorio-calendariofestivos';

export function servicioGuardarCentroVacacionalProveedor( 
        repositorioCentroVacacional: RepositorioCentroVacacional,
        repositorioCalendarioFestivos: RepositorioCalendarioFestivos,
        repositorioCategoriaUsuarios: RepositorioCategoriaUsuarios
    ) {
    return new ServicioGuardarCentroVacacional( 
        repositorioCentroVacacional, 
        repositorioCategoriaUsuarios,
        repositorioCalendarioFestivos
    );
}