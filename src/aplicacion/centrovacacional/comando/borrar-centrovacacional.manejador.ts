import { Injectable } from '@nestjs/common';
import { ServicioBorrarCentroVacacional } from 'src/dominio/centrovacacional/servicio/servicio-borrar-centrovacacional';
@Injectable()
export class ManejadorBorrarCentroVacacional {
  constructor(
    private _servicioBorrarCentroVacacional: ServicioBorrarCentroVacacional
  ){}

  async ejecutar( centroVacacionalId: number ): Promise<void> {
    await this._servicioBorrarCentroVacacional.ejecutar( centroVacacionalId );
  }
}