import { NotFoundException } from '@nestjs/common';
import { CalendarioFestivos } from 'src/dominio/calendariofestivos/modelo/calendariofestivos';
import { RepositorioCalendarioFestivos } from 'src/dominio/calendariofestivos/puerto/repositorio/repositorio-calendariofestivos';

export class ServicioActualizarCalendarioFestivos {

    constructor(
        private readonly _repositorioCalendarioFestivos: RepositorioCalendarioFestivos
    ) {}

    async ejecutar( calendarId: number, calendarioFestivos: CalendarioFestivos ): Promise<void> {

        // Validar existencia
        if( ! await this._repositorioCalendarioFestivos.existeCalendario( calendarId ) )
            throw new NotFoundException( `El calendario {${ calendarId }} no existe` );

        await this._repositorioCalendarioFestivos.actualizar( calendarId, calendarioFestivos );
    }
}