import { Injectable } from '@nestjs/common';

import { CotizacionDto } from 'src/aplicacion/cotizacion/consulta/dto/cotizacion.dto';
import { DaoCotizacion } from 'src/dominio/cotizacion/puerto/dao/dao-cotizacion';
@Injectable()
export class ManejadorObtenerCotizacion {

  constructor( private _daoCotizacion: DaoCotizacion ) {}

  async ejecutar( cotizacionId: number ): Promise<CotizacionDto> {
    return this._daoCotizacion.obtenerUnaCotizacion( cotizacionId );
  }
}
