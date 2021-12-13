import { Injectable } from '@nestjs/common';

import { ComandoGuardarCentroVacacional } from 'src/aplicacion/centrovacacional/comando/guardar-centrovacacional.comando';
import { ServicioGuardarCentroVacacional } from 'src/dominio/centrovacacional/servicio/servicio-guardar-centrovacacional';
import { CentroVacacional } from 'src/dominio/centrovacacional/modelo/centrovacacional';
@Injectable()
export class ManejadorGuardarCentroVacacional {
  constructor(
    private _servicioGuardarCentroVacacional: ServicioGuardarCentroVacacional
  ){}

  async ejecutar( comandoGuardarCentroVacacional: ComandoGuardarCentroVacacional ) {

    await this._servicioGuardarCentroVacacional.ejecutar( new CentroVacacional(
      comandoGuardarCentroVacacional.nombre,
      comandoGuardarCentroVacacional.descripcion,
      comandoGuardarCentroVacacional.calendarios,
      comandoGuardarCentroVacacional.categoriaUsuarios,
      comandoGuardarCentroVacacional.calendarioActivo
    ) );
  }
}