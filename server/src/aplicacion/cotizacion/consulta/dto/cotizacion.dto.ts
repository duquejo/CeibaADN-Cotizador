import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

import { CentroVacacionalDto } from 'src/aplicacion/centrovacacional/consulta/dto/centrovacacional.dto';
import { CategoriaUsuariosDto } from 'src/aplicacion/categoriausuarios/consulta/dto/categoriausuarios.dto';
import { CentroVacacionalEntidad } from 'src/infraestructura/centrovacacional/entidad/centrovacacional.entidad';
import { CategoriaUsuariosEntidad } from 'src/infraestructura/categoriausuarios/entidad/categoriausuarios.entidad';
@Exclude()
export class CotizacionDto {

  @Expose()
  @ApiProperty({ example: 1 })  
  public id: number;

  @Expose()
  @ApiProperty({ example: 'a123345b-cdef-1234-abcd-abcdefg12345' })  
  public codigo: number;

  @Expose()
  @ApiProperty({ type: [ CentroVacacionalEntidad ] })
  @Type( () => CentroVacacionalDto )
  public centroVacacional: CentroVacacionalEntidad[];

  @Expose()
  @ApiProperty({ type: [ CategoriaUsuariosEntidad ] })
  @Type( () => CategoriaUsuariosDto )
  public categoriaUsuarios: CategoriaUsuariosEntidad[];

  @Expose()
  @ApiProperty({ example: '2021-12-10' })
  public fechaInicio: string;

  @Expose()
  @ApiProperty({ example: '2021-12-18' })
  public fechaFin: string;  

  @Expose()
  @ApiProperty({ example: 3 })  
  public personas: number;

  @Expose()
  @ApiProperty({ example: 150000 })  
  public total: number;  
}
