import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';

import { DaoCalendarioFestivos } from 'src/dominio/calendariofestivos/puerto/dao/dao-calendariofestivos';
import { CalendarioFestivosEntidad } from 'src/infraestructura/calendariofestivos/entidad/calendariofestivos.entidad';
import { CalendarioFestivosDto } from 'src/aplicacion/calendariofestivos/consulta/dto/calendariofestivos.dto';
@Injectable()
export class DaoCalendarioFestivosMysql implements DaoCalendarioFestivos {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}
  async obtener(): Promise<CalendarioFestivosDto[]> {
    const calendarios = await this.entityManager
      .createQueryBuilder( CalendarioFestivosEntidad, 'calendariofestivos' )
      .select()
      .getMany();
    return plainToClass( CalendarioFestivosDto, calendarios );
  }
}