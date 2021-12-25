import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CentroVacacionalDto } from 'src/aplicacion/centrovacacional/consulta/dto/centrovacacional.dto';
import { DaoCentroVacacional } from 'src/dominio/centrovacacional/puerto/dao/dao-centrovacacional';
import { CentroVacacionalEntidad } from 'src/infraestructura/centrovacacional/entidad/centrovacacional.entidad';
import { constantes } from '../../../../dominio/shared/constantes.enum';

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
      .limit(constantes.LIMITE_RECURSOS_GET)      
      .getMany();
    return plainToClass( CentroVacacionalDto, centrosVacacionales );
  }
}
