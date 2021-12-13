import { Injectable } from '@nestjs/common';

import { CategoriaUsuarios } from 'src/dominio/categoriausuarios/modelo/categoriausuarios';
import { ComandoGuardarCategoriaUsuarios } from 'src/aplicacion/categoriausuarios/comando/guardar-categoriausuarios.comando';
import { ServicioGuardarCategoriaUsuarios } from 'src/dominio/categoriausuarios/servicio/servicio-guardar-categoriausuarios';
@Injectable()
export class ManejadorGuardarCategoriaUsuarios {
  constructor(
    private _servicioGuardarCategoriaUsuarios: ServicioGuardarCategoriaUsuarios
  ){}

  async ejecutar( comandoGuardarCategoriaUsuarios: ComandoGuardarCategoriaUsuarios ) {

    await this._servicioGuardarCategoriaUsuarios.ejecutar( new CategoriaUsuarios(
      comandoGuardarCategoriaUsuarios.nombre,
      comandoGuardarCategoriaUsuarios.descripcion,
      comandoGuardarCategoriaUsuarios.valorAlta,
      comandoGuardarCategoriaUsuarios.valorBaja
    ) );
  }
}
