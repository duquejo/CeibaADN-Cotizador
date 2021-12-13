import { Cotizacion } from 'src/dominio/cotizacion/modelo/cotizacion';
export abstract class RepositorioCotizacion {   
    /**
     * Transacciones
     */
     abstract crear( cotizacion: Cotizacion, totalCotizacion: object ): Promise<void>;
}
