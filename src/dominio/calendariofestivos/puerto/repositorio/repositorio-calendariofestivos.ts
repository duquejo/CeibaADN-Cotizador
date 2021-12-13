import { CalendarioFestivos } from 'src/dominio/calendariofestivos/modelo/calendariofestivos';

import { CalendarioFestivosEntidad } from 'src/infraestructura/calendariofestivos/entidad/calendariofestivos.entidad';

export abstract class RepositorioCalendarioFestivos {

    /**
     * Reglas del negocio
     */
    abstract existeCalendario( calendarioId: number ): Promise<boolean>;
    abstract validarCalendarios( calendariosIds: CalendarioFestivosEntidad[] ): Promise<[ CalendarioFestivosEntidad[], number]>;

    /**
     * CRUD
     */
    abstract guardar( calendario: CalendarioFestivos ): Promise<void>;
    abstract actualizar( calendarioId : number, calendario: CalendarioFestivos ): Promise<void>;
    abstract borrar( calendarioId : number ): Promise<void>;
}