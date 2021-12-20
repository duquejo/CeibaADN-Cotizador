import { IsArray, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ComandoGuardarCalendarioFestivos {

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Festivos Colombia Diciembre'})
  public nombre: string;

  @ApiProperty({ example: 'Descripción festivos Colombianos de diciembre', default: '' })
  public descripcion: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({ type: [ Date ], example: [ '2021-12-18' ], examples: [[ '2021-12-16', '2021-12-24', '2021-12-31' ], [ '2021-12-18' ]], default: [] })
  public festivos: string[];
}
