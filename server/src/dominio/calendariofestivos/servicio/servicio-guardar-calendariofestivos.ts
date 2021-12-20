import { CalendarioFestivos } from 'src/dominio/calendariofestivos/modelo/calendariofestivos';
import { RepositorioCalendarioFestivos } from 'src/dominio/calendariofestivos/puerto/repositorio/repositorio-calendariofestivos';

export class ServicioGuardarCalendarioFestivos {

    constructor(
        private readonly _repositorioCalendarioFestivos: RepositorioCalendarioFestivos
    ) {}

    async ejecutar( calendarioFestivos: CalendarioFestivos ) {
        return this._repositorioCalendarioFestivos.guardar( calendarioFestivos );
    }
}
