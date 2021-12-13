import { ServicioCrearCotizacion } from 'src/dominio/cotizacion/servicio/servicio-registrar-cotizacion';

import { RepositorioCotizacion } from 'src/dominio/cotizacion/puerto/repositorio/repositorio-cotizacion';
import { RepositorioCentroVacacional } from 'src/dominio/centrovacacional/puerto/repositorio/repositorio-centrovacacional';
import { RepositorioCategoriaUsuarios } from 'src/dominio/categoriausuarios/puerto/repositorio/repositorio-categoriausuarios';

export function servicioCrearCotizacionProveedor( 
        repositorioCotizacion: RepositorioCotizacion,
        repositorioCentroVacacional: RepositorioCentroVacacional,
        repositorioCategoriaUsuarios: RepositorioCategoriaUsuarios
    ) {
    return new ServicioCrearCotizacion( 
        repositorioCotizacion,
        repositorioCentroVacacional, 
        repositorioCategoriaUsuarios
    );
}