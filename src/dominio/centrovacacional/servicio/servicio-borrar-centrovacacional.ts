import { NotFoundException } from '@nestjs/common';
import { RepositorioCentroVacacional } from 'src/dominio/centrovacacional/puerto/repositorio/repositorio-centrovacacional';
export class ServicioBorrarCentroVacacional {

    constructor(
        private readonly _repositorioCentroVacacional: RepositorioCentroVacacional
    ) {}

    async ejecutar( centroVacacionalId: number ): Promise<void> {
        
        // Validar existencia
        const [ centroVacacionalObj, resultados ] = (
            await this._repositorioCentroVacacional.existeCentroVacacional( centroVacacionalId )
        );
        if( resultados === 0 || ! centroVacacionalObj ) {
            throw new NotFoundException( `El centro vacacional {${ centroVacacionalId }} no existe` );
        }
        await this._repositorioCentroVacacional.borrar( centroVacacionalId );
    }
}
