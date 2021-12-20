import { Injectable } from '@nestjs/common';

import { CategoriaUsuariosDto } from 'src/aplicacion/categoriausuarios/consulta/dto/categoriausuarios.dto';
import { DaoCategoriaUsuarios } from 'src/dominio/categoriausuarios/puerto/dao/dao-categoriausuarios';
@Injectable()
export class ManejadorObtenerCategoriaUsuarios {

  constructor(
    private _daoCategoriaUsuarios: DaoCategoriaUsuarios
  ) {}

  async ejecutar(): Promise<CategoriaUsuariosDto[]> {
    return this._daoCategoriaUsuarios.obtenerCategoriaUsuarios();
  }
}
