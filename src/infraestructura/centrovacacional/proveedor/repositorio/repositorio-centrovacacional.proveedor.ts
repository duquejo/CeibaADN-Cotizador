import { RepositorioCentroVacacional } from 'src/dominio/centrovacacional/puerto/repositorio/repositorio-centrovacacional';
import {RepositorioCentroVacacionalMysql } from 'src/infraestructura/centrovacacional/adaptador/repositorio/repositorio-centrovacacional-mysql';

export const repositorioCentroVacacionalProvider = {
    provide: RepositorioCentroVacacional,
    useClass: RepositorioCentroVacacionalMysql
};