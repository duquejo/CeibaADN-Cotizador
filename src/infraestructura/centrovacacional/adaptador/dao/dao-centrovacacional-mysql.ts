import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';

import { CentroVacacionalDto } from 'src/aplicacion/centrovacacional/consulta/dto/centrovacacional.dto';
import { DaoCentroVacacional } from 'src/dominio/centrovacacional/puerto/dao/dao-centrovacacional';
import { CentroVacacionalEntidad } from 'src/infraestructura/centrovacacional/entidad/centrovacacional.entidad';

@Injectable()
export class DaoCentroVacacionalMysql implements DaoCentroVacacional {

  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async obtenerCentrosVacacionales(): Promise<CentroVacacionalDto[]> {
    const centrosVacacionales = await this.entityManager
      .createQueryBuilder( CentroVacacionalEntidad, 'centrovacacional' )
      .leftJoinAndSelect( 'centrovacacional.calendarios', 'calendariofestivos' )
      .leftJoinAndSelect( 'centrovacacional.categoriaUsuarios', 'categoriausuarios' )
      .getMany();
    return plainToClass( CentroVacacionalDto, centrosVacacionales );
  }
}
