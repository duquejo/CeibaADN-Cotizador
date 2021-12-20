import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

import { CalendarioFestivosEntidad } from 'src/infraestructura/calendariofestivos/entidad/calendariofestivos.entidad';
import { CategoriaUsuariosEntidad } from 'src/infraestructura/categoriausuarios/entidad/categoriausuarios.entidad';
import { CalendarioFestivosDto } from 'src/aplicacion/calendariofestivos/consulta/dto/calendariofestivos.dto';
import { CategoriaUsuariosDto } from 'src/aplicacion/categoriausuarios/consulta/dto/categoriausuarios.dto';
@Exclude()
export class CentroVacacionalDto {

  @Expose()
  @ApiProperty({ example: 1 })
  readonly id: number;

  @Expose()  
  @ApiProperty({ example: 'Villa de Leyva' })
  readonly nombre: string;

  @Expose()  
  @ApiPropertyOptional({ type: 'string', example: 'Aventura arqueológica' })
  readonly descripcion: string;

  @Expose()
  @ApiPropertyOptional({ type: [ CalendarioFestivosEntidad ] })
  @Type( () => CalendarioFestivosDto )
  readonly calendarios: CalendarioFestivosEntidad[];

  @Expose()
  @ApiPropertyOptional({ type: [ CategoriaUsuariosEntidad ] })
  @Type( () => CategoriaUsuariosDto )
  readonly categoriaUsuarios: CategoriaUsuariosEntidad[];

  @Expose()
  @ApiPropertyOptional({ example: 1 })
  readonly calendarioActivo: number;  
}
