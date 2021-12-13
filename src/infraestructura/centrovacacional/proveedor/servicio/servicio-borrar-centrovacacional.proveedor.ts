import { RepositorioCentroVacacional } from 'src/dominio/centrovacacional/puerto/repositorio/repositorio-centrovacacional';
import { ServicioBorrarCentroVacacional } from 'src/dominio/centrovacacional/servicio/servicio-borrar-centrovacacional';

export function servicioBorrarCentroVacacionalProveedor( 
    repositorioCentroVacacional: RepositorioCentroVacacional ) {
    return new ServicioBorrarCentroVacacional( repositorioCentroVacacional );
}