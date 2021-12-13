import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';

import { CategoriaUsuariosDto } from 'src/aplicacion/categoriausuarios/consulta/dto/categoriausuarios.dto';
import { DaoCategoriaUsuarios } from 'src/dominio/categoriausuarios/puerto/dao/dao-categoriausuarios';
import { CategoriaUsuariosEntidad } from 'src/infraestructura/categoriausuarios/entidad/categoriausuarios.entidad';

@Injectable()
export class DaoCategoriaUsuariosMysql implements DaoCategoriaUsuarios {

  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async obtenerCategoriaUsuarios(): Promise<CategoriaUsuariosDto[]> {
    const categoriasUsuarios = await this.entityManager
      .createQueryBuilder( CategoriaUsuariosEntidad, 'categoriausuarios' )
      .select()
      .getMany();
    return plainToClass( CategoriaUsuariosDto, categoriasUsuarios );
  }
}