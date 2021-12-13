import { NotFoundException } from '@nestjs/common';
import { RepositorioCalendarioFestivos } from 'src/dominio/calendariofestivos/puerto/repositorio/repositorio-calendariofestivos';

export class ServicioBorrarCalendarioFestivos {

    constructor(
        private readonly _repositorioCalendarioFestivos: RepositorioCalendarioFestivos
    ) {}

    async ejecutar( calendarId: number ): Promise<void> {
        
        // Validar existencia
       if( ! await this._repositorioCalendarioFestivos.existeCalendario( calendarId ) )
           throw new NotFoundException( `El calendario {${ calendarId }} no existe` );
        await this._repositorioCalendarioFestivos.borrar( calendarId );
    }
}