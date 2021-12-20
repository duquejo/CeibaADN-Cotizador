import { Cotizacion } from 'src/dominio/cotizacion/modelo/cotizacion';
import { CotizacionEntidad } from '../../../../infraestructura/cotizacion/entidad/cotizacion.entidad';
export abstract class RepositorioCotizacion {   
    /**
     * Transacciones
     */
     abstract crear( cotizacion: Cotizacion, totalCotizacion: object ): Promise<CotizacionEntidad>;
}
