import { Injectable } from '@nestjs/common';
import { CentroVacacional } from 'src/dominio/centrovacacional/modelo/centrovacacional';
import { ComandoActualizarCentroVacacional } from 'src/aplicacion/centrovacacional/comando/actualizar-centrovacacional.comando';
import { ServicioActualizarCentroVacacional } from 'src/dominio/centrovacacional/servicio/servicio-actualizar-centrovacacional';
@Injectable()
export class ManejadorActualizarCentroVacacional {
  constructor(
    private _servicioActualizarCentroVacacional: ServicioActualizarCentroVacacional
  ){}

  async ejecutar( centroVacacionalId: number, comandoActualizarCentroVacacional: ComandoActualizarCentroVacacional ): Promise<void> {
    await this._servicioActualizarCentroVacacional.ejecutar(
      centroVacacionalId,
      new CentroVacacional(
        comandoActualizarCentroVacacional.nombre,
        comandoActualizarCentroVacacional.descripcion,
        comandoActualizarCentroVacacional.calendarios,
        comandoActualizarCentroVacacional.categoriaUsuarios,
        comandoActualizarCentroVacacional.calendarioActivo
      )
    );
  }
}