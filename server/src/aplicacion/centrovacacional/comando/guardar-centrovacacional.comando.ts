import { IsArray, IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { CalendarioFestivosEntidad } from 'src/infraestructura/calendariofestivos/entidad/calendariofestivos.entidad';
import { CategoriaUsuariosEntidad } from 'src/infraestructura/categoriausuarios/entidad/categoriausuarios.entidad';
export class ComandoGuardarCentroVacacional {

  @IsString()
  @ApiProperty({ example: 'Cartagena Resort'})
  public nombre: string;

  @IsOptional()
  @IsString()  
  @ApiPropertyOptional({ example: 'Descansa en un lugar increíble', default: '' })  
  public descripcion: string;

  @IsArray()
  @ApiPropertyOptional({ type: [ Number ], example: [ 1 ] })
  @IsOptional()
  public calendarios: CalendarioFestivosEntidad[];

  @IsArray()
  @ApiPropertyOptional({ type: [ Number ], example: [ 1 ] })
  @IsOptional()
  public categoriaUsuarios: CategoriaUsuariosEntidad[];

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 1 })
  public calendarioActivo: number;  
}
