import { Injectable } from '@nestjs/common';

import { CentroVacacionalDto } from 'src/aplicacion/centrovacacional/consulta/dto/centrovacacional.dto';
import { DaoCentroVacacional } from 'src/dominio/centrovacacional/puerto/dao/dao-centrovacacional';
@Injectable()
export class ManejadorObtenerCentroVacacional {

  constructor(
    private _daoCentroVacacional: DaoCentroVacacional
  ) {}

  async ejecutar(): Promise<CentroVacacionalDto[]> {
    return this._daoCentroVacacional.obtenerCentrosVacacionales();
  }
}
