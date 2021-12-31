import { Injectable } from '@nestjs/common';
import { ServicioBorrarCategoriaUsuarios } from '../../../dominio/categoriausuarios/servicio/servicio-borrar-categoriausuarios';

@Injectable()
export class ManejadorBorrarCategoriaUsuarios {
  constructor(
    private _servicioBorrarCategoriaUsuarios: ServicioBorrarCategoriaUsuarios
  ){}

  async ejecutar( categoriaId: number ): Promise<void> {
    await this._servicioBorrarCategoriaUsuarios.ejecutar( categoriaId );
  }
}
