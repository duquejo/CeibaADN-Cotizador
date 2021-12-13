import { IsArray, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoActualizarCalendarioFestivos {

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Festivos CV Cartagena'})
  public nombre: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Días de reyes y carnavales', default: '' })
  public descripcion: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({ type: [ Date ], example: [ '2021-12-18' ], examples: [[ '2021-12-16', '2021-12-24', '2021-12-31' ], [ '2021-12-18' ]], default: [] })
  public festivos: string[];
}
