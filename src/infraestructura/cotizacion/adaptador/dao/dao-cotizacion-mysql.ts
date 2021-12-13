import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';

import { DaoCotizacion } from 'src/dominio/cotizacion/puerto/dao/dao-cotizacion';
import { CotizacionDto } from 'src/aplicacion/cotizacion/consulta/dto/cotizacion.dto';

import { CotizacionEntidad } from 'src/infraestructura/cotizacion/entidad/cotizacion.entidad';

@Injectable()
export class DaoCotizacionMysql implements DaoCotizacion {

  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async obtenerUnaCotizacion( cotizacionId: number ): Promise<CotizacionDto> {
    const cotizacion = await this.entityManager
      .createQueryBuilder( CotizacionEntidad, 'cotizacion' )
      .leftJoinAndSelect( 'cotizacion.centroVacacional', 'centrovacacional' )
      .leftJoinAndSelect( 'cotizacion.categoriaUsuarios', 'categoriausuarios' )
      .where( 'cotizacion.id = :id', { id: cotizacionId })
      .getOne();
    return plainToClass( CotizacionDto, cotizacion );
  }
}