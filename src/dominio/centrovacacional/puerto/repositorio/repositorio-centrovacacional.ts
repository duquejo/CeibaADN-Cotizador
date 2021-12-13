import { CentroVacacional } from 'src/dominio/centrovacacional/modelo/centrovacacional';
import { CentroVacacionalEntidad } from 'src/infraestructura/centrovacacional/entidad/centrovacacional.entidad';

export abstract class RepositorioCentroVacacional {

    /**
     * Reglas del negocio
     */
    abstract existeCentroVacacional( centroVacacionalId: number ): Promise<[CentroVacacionalEntidad[], number]>;
    abstract obtenerUnCentroVacacional( centroVacacionalId: number ): Promise<CentroVacacionalEntidad>;
    abstract existeNombreCentroVacacional( nombre: string ): Promise<boolean>;
   
    /**
     * CRUD
     */
    //  abstract completarCentroVacacional( centroVacacionalId: number, centroVacacional: CentroVacacional ): Promise<CentroVacacionalEntidad>;
     abstract guardar( centroVacacional: CentroVacacional ): Promise<void>;
     abstract actualizar( centroVacacionalId : number, centroVacacional: CentroVacacional ): Promise<void>;
     abstract borrar( centroVacacionalId : number ): Promise<void>;
}