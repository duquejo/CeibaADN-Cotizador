import { RepositorioCotizacion } from 'src/dominio/cotizacion/puerto/repositorio/repositorio-cotizacion';
import { RepositorioCotizacionMysql } from 'src/infraestructura/cotizacion/adaptador/repositorio/repositorio-cotizacion-mysql';

export const repositorioCotizacionProvider = {
    provide: RepositorioCotizacion,
    useClass: RepositorioCotizacionMysql
};