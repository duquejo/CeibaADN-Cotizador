import { CotizacionDto } from 'src/aplicacion/cotizacion/consulta/dto/cotizacion.dto';
export abstract class DaoCotizacion {

  /**
   * Read OP
   */
  abstract obtenerUnaCotizacion( cotizacionId: number ): Promise<CotizacionDto>;
}